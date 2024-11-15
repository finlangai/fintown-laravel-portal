<?php

namespace App\Actions\Valuation\Calculating;

use App\Actions\Valuation\GetValuationParams;
use App\Models\Mongo\Company\Stash;
use App\Models\Mongo\Formular;
use App\Utils\EvalHelper;

class PriceEarningsToGrowthValuation
{
    public static function calculate(Formular $formularInfo, Stash $stash)
    {
        $params = (new GetValuationParams())->handle($formularInfo, $stash);
        $formular = $formularInfo->formular;

        $replacedFormular = EvalHelper::replaceParams($formular, $params);

        $valuationResult = EvalHelper::safeEval($replacedFormular);
        $valuationResult = round($valuationResult, 2);

        return compact("valuationResult");
    }
}
