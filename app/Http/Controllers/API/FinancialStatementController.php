<?php

namespace App\Http\Controllers\API;

use App\Actions\GetFinancialStatement;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\FinancialStatementRequest;
use App\Models\Mongo\Company\Company;
use App\Traits\Swagger\Symbols\FinancialStatementAnnotation;
use App\Utils\ApiResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FinancialStatementController extends Controller
{
    use FinancialStatementAnnotation;
    public function __invoke(
        string $symbol,
        FinancialStatementRequest $request,
        GetFinancialStatement $action
    ) {
        $validated = $request->validated();

        try {
            $company = Company::where("symbol", strtoupper($symbol))
                ->project([
                    "_id" => 0,
                    "symbol" => 1,
                    "icb_code" => 1,
                    "profile.is_using_cf_direct" => 1,
                ])
                ->firstOrFail();
        } catch (ModelNotFoundException $e) {
            return ApiResponse::notFound("Không tìm thấy công ty");
        }

        $result = $action->handle($validated, $company);
        if (!$result) {
            return ApiResponse::notFound("Không tìm thấy báo cáo");
        }

        return ApiResponse::success($result);
    }
}
