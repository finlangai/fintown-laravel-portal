<?php

namespace App\Actions\Valuation\Params;

use App\Actions\Valuation\Calculating\CapitalAssetPricingValuation;
use App\Enums\DividendType;
use App\Enums\StockValuationMethods;
use App\Models\Mongo\Company\Dividend;
use App\Models\Mongo\Company\Stash;
use App\Models\Mongo\Formular;
use App\Models\Mongo\MetricRecord;

class DividendDiscountParams
{
    public static function get(Formular $formularInfo, Stash $stash)
    {
        $VnIndexStash = Stash::where("symbol", "VN-INDEX")->first();
        $marketReturn = $VnIndexStash["market_return"];

        $CapmFormular = Formular::where(
            "identifier",
            StockValuationMethods::CAPITAL_ASSET_PRICING->value
        )->first();
        $r = (new CapitalAssetPricingValuation())->calculate(
            $CapmFormular,
            $stash,
            $marketReturn
        )["valuationResult"];

        $D1 = self::getLastAnnualDividend($stash->symbol);

        return compact("r", "D1");
    }

    public static function getLastAnnualDividend(string $symbol)
    {
        // Get dividend records sorted by year in descending order
        $dividendRecords = Dividend::where("symbol", $symbol)
            ->where("type", DividendType::CASH->value)
            ->whereNot("year", null)
            ->orderBy("year", "desc")
            ->project(["cash" => 1, "year" => 1])
            ->get()
            ->toArray();

        // sum dividends for each year
        $dividendsPerYear = [];
        foreach ($dividendRecords as $entry) {
            $year = (int) $entry["year"];
            $cash = $entry["cash"];

            // sum up dividends for the same year
            if (!isset($dividendsPerYear[$year])) {
                $dividendsPerYear[$year] = 0;
            }

            // set if not present
            $dividendsPerYear[$year] += $cash;
        }

        // Get current year
        $currentYear = (int) date("Y");

        // Loop through the sorted years and return the latest valid dividend
        foreach ($dividendsPerYear as $year => $cash) {
            // Skip future years and only consider past years
            if ($year == $currentYear) {
                continue;
            }

            // Return the latest valid dividend as an array with year and cash
            return $cash;
            // return [$year, $cash];
        }

        // If no valid dividend found, return null or an empty array
        return null;
    }
}
