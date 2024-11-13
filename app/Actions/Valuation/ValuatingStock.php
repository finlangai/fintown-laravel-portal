<?php

namespace App\Actions\Valuation;

use App\Actions\Valuation\Calculating\DiscountedCashFlowValuation;
use App\Actions\Valuation\Calculating\PriceToBookRelativeValuation;
use App\Actions\Valuation\Calculating\PriceToEarningsRelativeValuation;
use App\Actions\Valuation\Params\DiscountedCashFlowParams;
use App\Enums\StockValuationMethods;
use App\Models\Mongo\Company\Stash;
use App\Models\Mongo\Formular;
use App\Utils\EvalHelper;
use Lorisleiva\Actions\Concerns\AsAction;

class ValuatingStock
{
    use AsAction;

    public function handle(Formular $formularInfo, Stash $stash)
    {
        $valuationResult = null;

        switch ($formularInfo["identifier"]) {
            case StockValuationMethods::DISCOUNTED_CASH_FLOW->value:
                $valuationResult = DiscountedCashFlowValuation::calculate(
                    $formularInfo,
                    $stash
                );
                break;
            case StockValuationMethods::PRICE_TO_EARNING_RELATIVE->value:
                $valuationResult = PriceToEarningsRelativeValuation::calculate(
                    $formularInfo,
                    $stash
                );
                break;
            case StockValuationMethods::PRICE_TO_BOOK_RELATIVE->value:
                $valuationResult = PriceToBookRelativeValuation::calculate(
                    $formularInfo,
                    $stash
                );
                break;
        }

        return $valuationResult;
    }
}
