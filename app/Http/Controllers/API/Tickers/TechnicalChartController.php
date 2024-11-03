<?php

namespace App\Http\Controllers\API\Tickers;

use App\Actions\AggregateTickersTechnicalChartOverview;
use App\Http\Controllers\Controller;
use App\Utils\ApiResponse;
use App\Utils\Redis;
use App\Utils\Unix;
use Illuminate\Http\Request;

class TechnicalChartController extends Controller
{
    public string $baseCacheName = "tickers:technical-chart:";

    public function overview(AggregateTickersTechnicalChartOverview $action)
    {
        $cacheName = $this->baseCacheName . "overview";
        $cache = Redis::get($cacheName);
        if ($cache) {
            return ApiResponse::success($cache);
        }

        $result = $action->handle();
        Redis::set($cacheName, $result, Unix::untilNextHour(4));

        return ApiResponse::success($result);
    }

    public function stocks($request)
    {
    }
}
