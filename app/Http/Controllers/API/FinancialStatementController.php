<?php

namespace App\Http\Controllers\API;

use App\Actions\GetFinancialStatement;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\FinancialStatementRequest;
use App\Models\Mongo\Company\Company;
use App\Traits\Swagger\Symbols\FinancialStatementAnnotation;
use App\Utils\ApiResponse;

class FinancialStatementController extends Controller
{

    use FinancialStatementAnnotation;
    public function show(Company $company, FinancialStatementRequest $request, GetFinancialStatement $action)
    {
        $validated = $request->validated();

        $result = $action->handle($validated, $company);
        if (!$result) {
            return ApiResponse::notFound('No statements found');
        }

        return ApiResponse::success($result);
    }

}
