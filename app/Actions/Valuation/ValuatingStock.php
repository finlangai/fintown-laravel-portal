<?php

namespace App\Actions\Valuation;

use App\Models\Mongo\Company\Stash;
use App\Models\Mongo\Formular;
use App\Utils\EvalHelper;
use Lorisleiva\Actions\Concerns\AsAction;

class ValuatingStock
{
    use AsAction;

    public function handle(Formular $formularInfo, Stash $stash)
    {
        $params = (new GetValuationParams())->handle($formularInfo, $stash);
        $formular = $formularInfo->formular;

        $replacedFormular = EvalHelper::replaceParams($formular, $params);

        $valuationResult = EvalHelper::safeEval($replacedFormular);
        $valuationResult = round($valuationResult, 2);

        return compact("valuationResult");
    }
}
