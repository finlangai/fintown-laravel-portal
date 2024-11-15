<?php

namespace App\Actions\Valuation\Calculating;

use App\Actions\Valuation\Params\DiscountedCashFlowParams;
use App\Models\Mongo\Company\Stash;
use App\Models\Mongo\Formular;
use App\Models\Mongo\MetricRecord;
use App\Utils\EvalHelper;

class DiscountedCashFlowValuation
{
    public static function calculate(Formular $formularInfo, Stash $stash)
    {
        $validated = request()->validate([
            "t" => "required|integer|min:1",
            "r" => "required|numeric",
        ]);
        // t here is the t in the DCF formular
        $t = $validated["t"];
        // r here is the WACC or demanded rate of return
        $r = $validated["r"];

        list($records, $avgGrowthRate) = self::getFCFWithGrowthRate(
            $stash->symbol
        );

        $lastestFCF = $records[0]["free_cash_flow"];
        // list to accumulate
        $growingFCFList = [];
        // plus one to the growth rate to calculate on a 100% base
        $multiplyRate = 1 + $avgGrowthRate;
        // declare DCF accumulator
        $DCF = 0;
        for ($index = 0; $index < $t; $index++) {
            // t value
            $current_t = $index + 1;

            // if first, use the latest FCF value, else use the previous
            if ($index == 0) {
                $free_cash_flow = $lastestFCF;
            } else {
                // use the previous value to get the next growing
                $free_cash_flow = $growingFCFList[$index - 1];
            }
            $free_cash_flow *= $multiplyRate;
            $growingFCFList[$index] = $free_cash_flow;

            // define the expresison to evaluate
            $expression = EvalHelper::replaceParams($formularInfo->formular, [
                "t" => $current_t,
                ...compact("r", "free_cash_flow"),
            ]);

            $DCF += EvalHelper::safeEval($expression);
        }

        // === CALCULATE STOCK PRICE
        $outstandingShare = $stash["stats"]["outstanding_share"];
        $liablities = $stash["latest_report"]["liabilities"];
        $cash = $stash["latest_report"]["cash_and_cash_equivalents"];
        // g là tỷ lệ tăng trưởng vĩnh viễn
        $g = 0.02;

        $finalPredictedFCF = $growingFCFList[count($growingFCFList) - 1];
        $terminalValue = ($finalPredictedFCF * (1 + $g)) / ($r - $g);
        $discountedTV = (1 + $r) ** $t;

        // Sum the discounted DCF and Terminal Value then minus the Liabilities of the companies and add the Cash and Equavilent
        $equity = $DCF + $discountedTV - $liablities + $cash;
        $valuationResult = $equity / $outstandingShare;

        $actualPrice = $stash["stats"]["last_closed_price"];

        return compact("valuationResult", "actualPrice");
    }

    private static function getFCFWithGrowthRate(string $symbol)
    {
        $records = MetricRecord::where("symbol", $symbol)
            ->whereNot("quarter", 0)
            ->orderBy("year", "desc")
            ->orderBy("quarter", "desc")
            ->project(DiscountedCashFlowParams::getMetricsProjection())
            ->limit(12)
            ->get();

        $avgGrowthRate = DiscountedCashFlowParams::calculateGrowthRate(
            $records
        );

        return [$records, $avgGrowthRate];
    }
}
