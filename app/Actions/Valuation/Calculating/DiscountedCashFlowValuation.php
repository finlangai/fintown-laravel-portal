<?php

namespace App\Actions\Valuation\Calculating;

use App\Actions\Valuation\Params\DiscountedCashFlowParams;
use App\Models\Mongo\Company\Stash;
use App\Models\Mongo\Formular;
use App\Models\Mongo\MetricRecord;
use App\Utils\ApiResponse;
use App\Utils\EvalHelper;
use App\Utils\Logger;

class DiscountedCashFlowValuation
{
    public static function calculate(Formular $formularInfo, Stash $stash)
    {
        $validated = request()->validate([
            "t" => "required|integer|min:1",
        ]);
        // t here is the t in the DCF formular
        $t = $validated["t"];
        // r here is the WACC or demanded rate of return
        $r = $stash["wacc"];

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

        Logger::info("avgGrowthRate: " . $avgGrowthRate);

        for ($index = 0; $index < $t; $index++) {
            // t value
            $current_t = $index + 1;
            Logger::info("=======================");

            // if first, use the latest FCF value, else use the previous
            if ($index == 0) {
                Logger::info("lastestFCF: " . $lastestFCF / 10 ** 9);
                $free_cash_flow = $lastestFCF;
            } else {
                // use the previous value to get the next growing
                $free_cash_flow = $growingFCFList[$index - 1];
            }

            // get the undiscounted FCF
            $free_cash_flow *= $multiplyRate;
            $growingFCFList[$index] = $free_cash_flow;

            Logger::info(
                "FCF với t = $current_t: " . $free_cash_flow / 10 ** 9
            );

            // define the expresison to evaluate
            $expression = EvalHelper::replaceParams($formularInfo->formular, [
                "t" => $current_t,
                ...compact("r", "free_cash_flow"),
            ]);

            $discounted_dcf = EvalHelper::safeEval($expression);
            $DCF += $discounted_dcf;
            Logger::info(
                "FCF đã chiết khấu với t = $current_t: " .
                    $discounted_dcf / 10 ** 9
            );
        }

        // === CALCULATE STOCK PRICE
        $outstandingShare = $stash["stats"]["outstanding_share"];
        $liablities = $stash["latest_report"]["liabilities"];
        $borrowings =
            intval($stash["latest_report"]["short_term_borrowings"]) +
            intval($stash["latest_report"]["long_term_borrowings"]);
        $cash = $stash["latest_report"]["cash_and_cash_equivalents"];

        // g là tỷ lệ tăng trưởng vĩnh viễn
        $g = 0.02;

        $finalPredictedFCF = $growingFCFList[count($growingFCFList) - 1];
        $terminalValue = ($finalPredictedFCF * (1 + $g)) / ($r - $g);
        $discountedTV = $terminalValue / (1 + $r) ** $t;

        Logger::info("borrowings: " . $borrowings / 10 ** 9);
        Logger::info("terminalValue: " . $terminalValue / 10 ** 9);
        Logger::info("discountedTV: " . $discountedTV / 10 ** 9);

        // Sum the discounted DCF and Terminal Value then minus the Liabilities of the companies and add the Cash and Equavilent
        // $equity = $DCF + $discountedTV - $liablities + $cash;
        $equity = $DCF + $discountedTV - $borrowings + $cash;
        $valuationResult = $equity / $outstandingShare;

        return compact("valuationResult");
    }

    private static function getFCFWithGrowthRate(string $symbol)
    {
        $records = MetricRecord::where("symbol", $symbol)
            ->whereNot("quarter", 0)
            ->orderBy("year", "desc")
            ->orderBy("quarter", "desc")
            ->project(DiscountedCashFlowParams::getMetricsProjection())
            ->limit(20)
            ->get();

        $avgGrowthRate = DiscountedCashFlowParams::calculateGrowthRate(
            $records
        );

        return [$records, $avgGrowthRate];
    }
}
