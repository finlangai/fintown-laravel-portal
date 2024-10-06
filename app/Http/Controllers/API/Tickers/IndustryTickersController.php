<?php

namespace App\Http\Controllers\API\Tickers;

use App\Actions\GetTickerByIndustry;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\IndustryTickersRequest;
use App\Models\Mongo\Company\Company;
use App\Traits\GetLatestQuotes;
use App\Traits\Swagger\Tickers\IndustryTickersAnnotation;
use App\Utils\ApiResponse;

class IndustryTickersController extends Controller
{
    use IndustryTickersAnnotation;
    public function __invoke(
        IndustryTickersRequest $request,
        GetTickerByIndustry $action
    ) {
        $validated = $request->validated();

        $result = $action->handle($validated);

        if (!$result) {
            return ApiResponse::notFound("Không tìm thấy công ty");
        }

        return ApiResponse::success($result);
    }
}
