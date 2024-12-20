<?php

namespace App\Actions\Valuation\Params;

use App\Models\Mongo\Company\Stash;
use App\Models\Mongo\Formular;
use App\Models\Mongo\MetricRecord;

class GrahamIntrinsicValueParams
{
    public const EpsGrowthRateIdentifier = "earnings_per_share_growth_rate";

    public static function get(Formular $formularInfo, Stash $stash)
    {
        $EpsGrowthRate = self::getEpsGrowthRate($stash->symbol);

        return [
            "bonds_yield" => $formularInfo["params"]["Y"],
            "earnings_per_share" => $stash["stats"]["eps_ltm"],
            self::EpsGrowthRateIdentifier => $EpsGrowthRate,
        ];
    }

    public static function getEpsGrowthRate(string $symbol)
    {
        $records = MetricRecord::where("symbol", $symbol)
            ->where("quarter", 0)
            ->orderBy("year", "desc")
            ->limit(10)
            ->whereNot("metrics." . self::EpsGrowthRateIdentifier, null)
            ->project(["value" => '$metrics.' . self::EpsGrowthRateIdentifier])
            ->get()
            ->toArray();

        $sumEpsGrowth = array_reduce(
            $records,
            fn($carry, $item) => $carry + $item["value"] / 100,
            0
        );

        return $sumEpsGrowth / count($records);
    }
}
