<?php

namespace App\Http\Controllers\API;

use App\Actions\GetFinancialRatio;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\RatioRequest;
use App\Models\Mongo\Company\Company;
use App\Traits\Swagger\Symbols\RatioAnnotation;
use App\Utils\ApiResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RatioController extends Controller
{
    use RatioAnnotation;
    public function __invoke(
        string $symbol,
        RatioRequest $request,
        GetFinancialRatio $action
    ) {
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

        $result = $action->handle($request->validated(), $company);

        return ApiResponse::success($result);
    }
}
