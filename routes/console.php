<?php

use App\Jobs\CallPythonService;
use App\Jobs\UpdateDailyStats;
use App\Models\SQL\System\Backjob;
use App\Utils\Logger;
use App\Utils\Redis;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command("inspire", function () {
    $this->comment(Inspiring::quote());
})
    ->purpose("Display an inspiring quote")
    ->hourly();

$backjobs = Redis::get("backjobs");
if (!$backjobs) {
    // get backjob data if is not cached
    $backjobs = Backjob::where("is_active", true)->get();
    Redis::set("backjobs", json_encode($backjobs));
} else {
    // decode if backjobs is cached
    $backjobs = json_decode($backjobs, true);
}
