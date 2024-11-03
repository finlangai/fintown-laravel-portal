<?php

namespace App\Http\Controllers\API\Tickers;

use App\Actions\GetTopGainerTickers;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\TopGainerTickersRequest;
use App\Utils\ApiResponse;
use App\Utils\Redis;
use App\Utils\Unix;

class TopGainerTickersController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(
        TopGainerTickersRequest $request,
        GetTopGainerTickers $action
    ) {
        $validated = $request->validated();

        // redis cache name tickers:top-gainers:limit?
        $cacheName = "tickers:top-gainers:";
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
