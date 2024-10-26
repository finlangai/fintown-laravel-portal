<?php

namespace App\Traits;

use Carbon\Carbon;
use Cron\CronExpression;

trait JobTimestamps
{
    private function getJobTimestamps(): array
    {
        return [Carbon::now(), $this->calculateNextRun($this->jobInfo)];
    }

    private function calculateNextRun($job)
    {
        if (!empty($job->cron_expression)) {
            $cron = new CronExpression($job->cron_expression);
            return Carbon::instance($cron->getNextRunDate());
        }

        $nextRun = Carbon::now();

        switch ($job->interval) {
            case "minutely":
                $nextRun->addMinute();
                break;
            case "hourly":
                $nextRun->addHour();
                break;
            case "daily":
                $nextRun->addDay();
                break;
            case "weekly":
                $nextRun->addWeek();
                break;
            case "monthly":
                $nextRun->addMonth();
                break;
        }

        return $nextRun;
    }
}
