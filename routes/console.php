<?php

use App\Utils\Redis;
use Illuminate\Support\Str;
use App\Models\SQL\System\Backjob;
use App\Utils\Logger;
use Illuminate\Support\Facades\App;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command("inspire", function () {
    $this->comment(Inspiring::quote());
})
    ->purpose("Display an inspiring quote")
    ->hourly();

use Predis\Client;

$client = new Client([
    "scheme" => "tcp",
    "host" => env("REDIS_HOST"),
    "port" => env("REDIS_PORT"),
    "password" => env("REDIS_PASSWORD"),
    "database" => 1,
]);
$redisPrefix = env(
    "REDIS_PREFIX",
    Str::slug(env("APP_NAME", "laravel"), "_") . "_database_"
);
$backjobsCacheName = $redisPrefix . "backjobs";

try {
    $backjobs = $client->get($backjobsCacheName);

    if (!$backjobs) {
        // get backjob data if not cached
        $backjobs = Backjob::where("is_active", true)->get()->toArray();
        $client->set($backjobsCacheName, json_encode($backjobs));
    } else {
        // decode if backjobs is cached
        $backjobs = json_decode($backjobs, true);
    }

    foreach ($backjobs as $job) {
        $jobClass = $job["job_class"];
        $jobId = $job["id"];
        $parameters = $job["parameters"];
        $params = compact("parameters", "jobId");

        $closure = fn() => App::make($jobClass, $params)->handle();

        $appTimezone = env("APP_TIMEZONE");

        if (!empty($job["cron_expression"])) {
            Schedule::call($closure)
                ->cron($job["cron_expression"])
                ->timezone($appTimezone);
            continue;
        }

        $time = $job["time"];
        switch ($job["interval"]) {
            case "minutely":
                Schedule::call($closure)->everyMinute();
                break;
            case "hourly":
                Schedule::call($closure)->hourly();
                break;
            case "daily":
                Schedule::call($closure)
                    ->dailyAt($time)
                    ->timezone($appTimezone);
                break;
            case "weekly":
                Schedule::call($closure)
                    ->weeklyOn(1, $time)
                    ->timezone($appTimezone);
                break;
            case "monthly":
                Schedule::call($closure)
                    ->monthlyOn(1, $time)
                    ->timezone($appTimezone);
                break;
        }
    }
} catch (\Exception $e) {
    logger()->error("Redis connection failed: " . $e->getMessage());
}
