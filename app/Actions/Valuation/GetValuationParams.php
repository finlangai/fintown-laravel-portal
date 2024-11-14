<?php

namespace App\Actions\Valuation;

use App\Actions\Valuation\Params\DiscountedCashFlowParams;
use App\Actions\Valuation\Params\GrahamIntrinsicValueParams;
use App\Actions\Valuation\Params\PriceEarningsToGrowthParams;
use App\Actions\Valuation\Params\PriceToBookRelativeParams;
use App\Actions\Valuation\Params\PriceToEarningsRelativeParams;
use App\Enums\StockValuationMethods;
use App\Models\Mongo\Company\Stash;
use App\Models\Mongo\Formular;
use App\Models\Mongo\MetricRecord;
use App\Traits\GetLatestQuarterMetrics;
use Lorisleiva\Actions\Concerns\AsAction;

class GetValuationParams
{
    use AsAction;
    use GetLatestQuarterMetrics;

    public function handle(Formular $formularInfo, Stash $stash)
    {
        $vn30Stash = Stash::where("symbol", "VN30")->first()->toArray();
        $symbol = $stash->symbol;

        switch ($formularInfo["identifier"]) {
            case StockValuationMethods::DISCOUNTED_CASH_FLOW->value:
                return DiscountedCashFlowParams::get($symbol);
                break;
            case StockValuationMethods::GRAHAM_INTRINSIC_VALUE->value:
                return GrahamIntrinsicValueParams::get($stash, $vn30Stash);
                break;
            case StockValuationMethods::PRICE_TO_EARNING_RELATIVE->value:
                return PriceToEarningsRelativeParams::get($symbol, $vn30Stash);
                break;
            case StockValuationMethods::PRICE_TO_BOOK_RELATIVE->value:
                return PriceToBookRelativeParams::get($symbol, $vn30Stash);
                break;
            case StockValuationMethods::PRICE_EARNINGS_TO_GROWTH->value:
                return PriceEarningsToGrowthParams::get($stash);
                break;
        }
    }
}
