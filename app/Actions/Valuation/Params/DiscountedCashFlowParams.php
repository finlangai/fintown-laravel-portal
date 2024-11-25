<?php

namespace App\Actions\Valuation\Params;

use App\Models\Mongo\Company\Stash;
use App\Models\Mongo\MetricRecord;
use Illuminate\Database\Eloquent\Collection;

class DiscountedCashFlowParams
{
    public const FCFIdentifier = "free_cash_flow";
    public const GrowthRateIdentifier = "free_cash_flow_growth_rate";

    public static function get(string $symbol, Stash $stash)
    {
        $records = MetricRecord::where("symbol", $symbol)
            ->where("quarter", 0)
            ->orderBy("year", "desc")
            ->project(self::getMetricsProjection())
            ->get();

        $avgGrowthRate = self::calculateGrowthRate($records);
        $forecast = [];

        $latestFCF = $records[0][self::FCFIdentifier];
        $latestYear = $records[0]["year"];
        for ($i = 0; $i < 7; $i++) {
            $period = ["year" => $latestYear + $i + 1];
            $multiplyRate = $avgGrowthRate + 1;

            if ($i == 0) {
                $period["free_cash_flow"] = $latestFCF * $multiplyRate;
                $forecast[] = $period;
                continue;
            }

            $period["free_cash_flow"] = round(
                $forecast[$i - 1]["free_cash_flow"] * $multiplyRate,
                2
            );
            $forecast[] = $period;
        }

        $fcf_forecasts = array_map(function ($point) {
            $point["free_cash_flow"] = round(
                $point["free_cash_flow"] / 10 ** 9,
                2
            );
            return $point;
        }, $forecast);

        // wacc
        $r = $stash["wacc"];

        return compact("r", "fcf_forecasts");
    }

    public static function calculateGrowthRate(Collection $records)
    {
        $growthRateSum = 0;
        $validCount = 0;
        $records->map(function ($record) use (&$growthRateSum, &$validCount) {
            if (
                $record[self::GrowthRateIdentifier] &&
                $record[self::GrowthRateIdentifier] <= 300 &&
                $record[self::GrowthRateIdentifier] >= -300
            ) {
                $growthRateSum += $record[self::GrowthRateIdentifier] / 100;
                $validCount += 1;
            }
        });

        return $growthRateSum / $validCount;
    }

    public static function getMetricsProjection()
    {
        return [
            "year" => 1,
            "quarter" => 1,
            self::FCFIdentifier => '$metrics.' . self::FCFIdentifier,
            self::GrowthRateIdentifier =>
                '$metrics.' . self::GrowthRateIdentifier,
        ];
    }
}
