<?php

namespace App\Traits;

use App\Utils\ApiResponse;
use Illuminate\Support\Collection;

/**
 * This trait is for querying collection that has fields like symbol, year, quarter
 */
trait QueryBySymbolPeriod
{
    private static function executeQueryBySymbol(
        $query,
        array $projection = [],
        array $skipIfNull = []
    ) {
        if (!empty($skipIfNull)) {
            foreach ($skipIfNull as $keyName) {
                // $query->whereNotNull($keyName);
                $query->whereRaw([
                    '$expr' => ['$ne' => ['$' . $keyName, null]],
                ]);
            }
        }

        if (!empty($projection)) {
            $query->project($projection);
        }

        return $query->get();
    }

    /**
     * Get yearly records of the model
     *
     * @param string $symbol
     * @param integer $year
     * @param integer $limit
     * @param array $projection
     * @param array $skipIfNull
     * @return Collection
     */
    public static function getYearlyRecordsBySymbolBefore(
        string $symbol,
        int $year,
        int $limit,
        array $projection = [],
        array $skipIfNull = []
    ): Collection {
        $query = self::where("symbol", $symbol)
            ->where("quarter", 0)
            ->where("year", "<", $year)
            ->orderBy("year", "desc")
            ->limit($limit);

        return self::executeQueryBySymbol($query, $projection, $skipIfNull);
    }

    /**
     * Get quarterly records of the model
     *
     * @param string $symbol
     * @param integer $year
     * @param integer $quarter
     * @param integer $limit
     * @param array $projection
     * @param array $skipIfNull
     * @return Collection
     */
    public static function getQuarterlyRecordsBySymbolBefore(
        string $symbol,
        int $year,
        int $quarter,
        int $limit,
        array $projection = [],
        array $skipIfNull = []
    ): Collection {
        $query = self::where("symbol", $symbol)
            ->whereBetween("quarter", [1, 4])
            ->where(function ($query) use ($year, $quarter) {
                $query
                    ->where("year", "<", $year)
                    ->orWhere(function ($query) use ($year, $quarter) {
                        $query
                            ->where("year", $year)
                            ->where("quarter", "<", $quarter);
                    });
            })
            ->orderBy("year", "desc")
            ->orderBy("quarter", "desc")
            ->limit($limit);

        return self::executeQueryBySymbol($query, $projection, $skipIfNull);
    }
}
