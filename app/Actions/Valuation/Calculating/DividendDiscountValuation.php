<?php

namespace App\Actions\Valuation\Calculating;

use App\Actions\Valuation\GetValuationParams;
use App\Actions\Valuation\Params\CapitalAssetPricingParams;
use App\Actions\Valuation\Params\DividendDiscountParams;
use App\Models\Mongo\Company\Stash;
use App\Models\Mongo\Formular;
use App\Utils\ApiResponse;
use App\Utils\EvalHelper;

class DividendDiscountValuation
{
    public static function calculate(Formular $formularInfo, Stash $stash)
    {
        $params = (new DividendDiscountParams())->get($formularInfo, $stash);
        $validated = request()->validate([
            "g" => "required|numeric|min:0|max:1",
        ]);
        $g = floatval($validated["g"]);

        // avoid zero dividing
        if ($g == $params["r"]) {
            return ApiResponse::badRequest(
                "Tỉ lệ tăng trưởng (g) không được bằng với tỷ suất yêu cầu (r)."
            );
        }

        $expression = EvalHelper::replaceParams($formularInfo->formular, [
            ...$params,
            ...compact("g"),
        ]);

        $valuationResult = EvalHelper::safeEval($expression);

        return compact("valuationResult");
    }
}
