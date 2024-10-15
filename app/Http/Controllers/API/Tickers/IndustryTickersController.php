<?php

namespace App\Http\Controllers\API\Tickers;

use App\Actions\GetTickerByIndustry;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\IndustryTickersRequest;
use App\Traits\Swagger\Tickers\IndustryTickersAnnotation;
use App\Utils\ApiResponse;
use App\Utils\Redis;
use App\Utils\Unix;
use App\Utils\UnixCalculator;

class IndustryTickersController extends Controller
{
    use IndustryTickersAnnotation;
    public function __invoke(
        IndustryTickersRequest $request,
        GetTickerByIndustry $action
    ) {
        $validated = $request->validated();

        // redis cache name tickers:industry:name:limit?
        $cacheName = "tickers:industry:" . $validated["name"] . ":";
        $cacheName .= isset($validated["limit"])
            ? $validated["limit"]
            : $action->tickersLimit;

        $cache = Redis::get($cacheName);
        if ($cache) {
            return ApiResponse::success($cache);
        }

        $result = $action->handle($validated);

        if (!$result) {
            return ApiResponse::notFound("Không tìm thấy công ty");
        }

        // set cache
        Redis::set($cacheName, $result, Unix::hour(12));

        return ApiResponse::success($result);
    }
}
