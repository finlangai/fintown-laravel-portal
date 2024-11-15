<?php

namespace App\Actions\Valuation\Params;

use App\Models\Mongo\Company\Stash;
use App\Models\Mongo\Formular;
use App\Models\Mongo\MetricRecord;

class CapitalAssetPricingParams
{
    public static function get(Formular $formularInfo, Stash $stash)
    {
        return [
            "beta" => $stash["beta"],
            ...$formularInfo["params"],
        ];
    }
}
