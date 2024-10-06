<?php

namespace App\Traits;

trait GetIntervalIndex
{
    public static function getIntervalIndex(string $interval): int
    {
        $intervalMap = [
            "1m" => 0,
            "1H" => 4,
            "1D" => 5,
            "1W" => 6,
            "1M" => 7,
        ];
        return $intervalMap[$interval];
    }
}
