<?php

namespace App\Actions\Valuation\Params;

use App\Models\Mongo\Company\Stash;
use App\Models\Mongo\MetricRecord;

class PriceEarningsToGrowthParams
{
    public const EpsGrowthIdentifier = "earnings_per_share_growth_rate";

    public static function get(Stash $stash)
    {
        return [
            "price_to_earnings" => $stash["stats"]["pe_ltm"],
            "earnings_per_share_growth_rate" => self::getEpsGrowthRate(
                $stash["symbol"]
            ),
        ];
    }

    public static function getEpsGrowthRate(string $symbol)
    {
        $records = MetricRecord::where("symbol", $symbol)
            ->where("quarter", 0)
            ->orderBy("year", "desc")
            ->whereNot("metrics." . self::EpsGrowthIdentifier, null)
            ->project(["value" => '$metrics.' . self::EpsGrowthIdentifier])
            ->get()
            ->toArray();

        $sumEpsGrowth = array_reduce(
            $records,
            fn($carry, $item) => $carry + $item["value"],
            0
        );

        return $sumEpsGrowth / count($records);
    }
}
