<?php

namespace App\Actions\Valuation\Calculating;

use App\Actions\Valuation\GetValuationParams;
use App\Actions\Valuation\Params\CapitalAssetPricingParams;
use App\Models\Mongo\Company\Stash;
use App\Models\Mongo\Formular;
use App\Utils\EvalHelper;

class CapitalAssetPricingValuation
{
    public static function calculate(
        Formular $formularInfo,
        Stash $stash,
        $marketReturn = null
    ) {
        // get the required return rate
        if ($marketReturn) {
            $Rm = $marketReturn;
        } else {
            $validated = request()->validate([
                "Rm" => "required|numeric|min:0|max:1",
            ]);
            $Rm = floatval($validated["Rm"]);
        }

        $params = (new CapitalAssetPricingParams())->get($formularInfo, $stash);
        $params["market_return"] = $Rm;

        $formular = $formularInfo->formular;

        $replacedFormular = EvalHelper::replaceParams($formular, $params);

        $valuationResult = EvalHelper::safeEval($replacedFormular);
        $valuationResult = round($valuationResult, 2);
        return compact("valuationResult");
    }
}
