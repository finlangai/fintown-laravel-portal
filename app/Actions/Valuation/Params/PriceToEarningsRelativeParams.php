<?php

namespace App\Actions\Valuation\Params;

use App\Traits\GetLatestQuarterMetrics;

class PriceToEarningsRelativeParams
{
    use GetLatestQuarterMetrics;
    public static function get(string $symbol, array $vn30Stash)
    {
        $metrics = self::getLatestQuarterMetrics($symbol);
        return [
            "earnings_per_share" => round($metrics["earnings_per_share"], 2),
            "price_to_earnings" => $vn30Stash["pe"],
        ];
    }
}
