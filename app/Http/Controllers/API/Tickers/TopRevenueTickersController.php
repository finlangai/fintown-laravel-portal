<?php

namespace App\Http\Controllers\API\Tickers;

use App\Utils\Unix;
use App\Utils\Redis;
use App\Utils\ApiResponse;
use App\Http\Controllers\Controller;
use App\Actions\GetTopRevenueTickers;
use App\Http\Requests\API\TopRevenueTickersRequest;

class TopRevenueTickersController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(
        TopRevenueTickersRequest $request,
        GetTopRevenueTickers $action
    ) {
        $validated = $request->validated();

        // redis cache name tickers:top-gainers:limit?
        $cacheName = "tickers:top-revenue:";
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
        Redis::set($cacheName, $result, Unix::untilNextHour(4));

        return ApiResponse::success($result);
    }
}
