<?php

namespace App\Actions\Valuation\Calculating;

use App\Actions\Valuation\GetValuationParams;
use App\Actions\Valuation\Params\GrahamIntrinsicValueParams;
use App\Models\Mongo\Company\Stash;
use App\Models\Mongo\Formular;
use App\Utils\EvalHelper;

class GrahamIntrinsicValueValuation
{
    public static function calculate(Formular $formularInfo, Stash $stash)
    {
        $formular = $formularInfo["formular"];
        $dynamicParams = (new GrahamIntrinsicValueParams())->get($stash);

        $params = $formularInfo["params"];
        $earnings_per_share = $dynamicParams["earnings_per_share"];
        $g =
            $dynamicParams[GrahamIntrinsicValueParams::EpsGrowthRateIdentifier];

        $expression = EvalHelper::replaceParams($formular, [
            ...$params,
            ...compact("g", "earnings_per_share"),
        ]);

        $valuationResult = EvalHelper::safeEval($expression);

        $actualPrice = $stash["stats"]["last_closed_price"];

        return compact("valuationResult", "actualPrice");
    }
}
