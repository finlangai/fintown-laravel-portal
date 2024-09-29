<?php

namespace App\Http\Controllers\API;

use App\Actions\GetFinancialRatio;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\RatioRequest;
use App\Models\Mongo\Company\Company;
use App\Traits\Swagger\Symbols\RatioAnnotation;
use App\Utils\ApiResponse;

class RatioController extends Controller
{
    use RatioAnnotation;
    public function show(Company $company, RatioRequest $request, GetFinancialRatio $action)
    {
        $result = $action->handle(
            $request->validated(),
            $company
        );
        return ApiResponse::success($result);
    }

}
