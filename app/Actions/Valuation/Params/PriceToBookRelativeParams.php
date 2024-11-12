<?php

namespace App\Actions\Valuation\Params;

use App\Traits\GetLatestQuarterMetrics;

class PriceToBookRelativeParams
{
    use GetLatestQuarterMetrics;
    public static function get(string $symbol, array $vn30Stash)
    {
        $metrics = self::getLatestQuarterMetrics($symbol);
        return [
            "book_value_per_share" => round(
                $metrics["book_value_per_share"],
                2
            ),
            "price_to_book" => $vn30Stash["pb"],
        ];
    }
}
