<?php

namespace App\Http\Controllers\Valuation;

use App\Actions\Valuation\GetValuationParams;
use App\Actions\Valuation\ValuatingStock;
use App\Http\Controllers\Controller;
use App\Models\Mongo\Company\Stash;
use App\Models\Mongo\Formular;
use App\Utils\ApiResponse;
use Illuminate\Support\Facades\Request;

class ValuationController extends Controller
{
    public function params(
        Request $request,
        Formular $formularInfo,
        Stash $stash,
        GetValuationParams $action
    ) {
        $result = $action->handle($formularInfo, $stash);
        return ApiResponse::success($result);
    }

    public function calculate(
        Request $request,
        Formular $formularInfo,
        Stash $stash,
        ValuatingStock $valuating
    ) {
        $result = $valuating->handle($formularInfo, $stash);
        return ApiResponse::success($result);
    }
}