<?php

namespace App\Traits;

use App\Models\Mongo\MetricRecord;

trait GetLatestQuarterMetrics
{
    public static function getLatestQuarterMetrics(string $symbol)
    {
        return MetricRecord::where("symbol", $symbol)
            ->whereNot("quarter", 0)
            ->orderBy("year", "desc")
            ->orderBy("quarter", "desc")
            ->first()
            ->toArray()["metrics"];
    }
}
