<?php

use App\Utils\Redis;
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

// === BACKJOBS SECTION
$backjobs = Redis::get("backjobs");
if (!$backjobs) {
    // get backjob data if is not cached
    $backjobs = Backjob::where("is_active", true)->get()->toArray();
    Redis::set("backjobs", json_encode($backjobs));
} else {
    // decode if backjobs is cached
    $backjobs = json_decode($backjobs, true);
}

// == LOOP THROUGH EACH BACKJOBS
foreach ($backjobs as $job) {
    $jobClass = $job["job_class"];
    $jobId = $job["id"];

    $parameters = $job["parameters"];

    $params = compact("parameters", "jobId");

    // DEFINE CLOSURE FUNCTION
    $closure = fn() => App::make($jobClass, $params)->handle();

    // get app timezone
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
            Schedule::call($closure)->dailyAt($time)->timezone($appTimezone);
            break;
        case "weekly":
            Schedule::call($closure)
                ->weeklyOn(1, $time)
                ->timezone($appTimezone); // Default to Monday
            break;
        case "monthly":
            Schedule::call($closure)
                ->monthlyOn(1, $time)
                ->timezone($appTimezone); // Default to first day of the month
            break;
    }
}
