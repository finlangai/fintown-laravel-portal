<?php

namespace App\Traits;

use Illuminate\Support\Collection;

/**
 * This trait is for querying collection that has fields like symbol, year, quarter
 */
trait QueryBySymbolPeriod
{
    public static function getYearlyRecordsBySymbolBefore(string $symbol, int $year, int $limit): Collection
    {
        return self::where('symbol', $symbol)
            ->where('quarter', 0)
            ->where('year', '<', $year)
            ->orderBy('year', 'desc')
            ->limit($limit)
            ->get();
    }

    public static function getQuarterlyRecordsBySymbolBefore(string $symbol, int $year, int $quarter, int $limit): Collection
    {
        return self::where('symbol', $symbol)
            ->whereBetween('quarter', [ 1, 4 ])
            ->where(function ($query) use ($year, $quarter) {
                $query->where('year', '<', $year)
                    ->orWhere(function ($query) use ($year, $quarter) {
                        $query->where('year', $year)
                            ->where('quarter', '<', $quarter);
                    });
            })
            ->orderBy('year', 'desc')
            ->orderBy('quarter', 'desc')
            ->limit($limit)
            ->get();
    }
}
