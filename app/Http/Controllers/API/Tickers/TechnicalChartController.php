<?php

namespace App\Http\Controllers\API\Tickers;

use App\Actions\AggregateTickersTechnicalChartOverview;
use App\Actions\GetTechnicalChartInstruments;
use App\Http\Controllers\Controller;
use App\Http\Requests\TechnicalChartInstrumentsRequest;
use App\Utils\ApiResponse;
use App\Utils\Redis;
use App\Utils\Unix;
use App\Utils\Util;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isJson;

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

    public function instruments(
        TechnicalChartInstrumentsRequest $request,
        GetTechnicalChartInstruments $action
    ) {
        $validated = $request->validated();

        $result = $action->handle($validated);

        if ($result instanceof JsonResponse) {
            return $result;
        }

        return ApiResponse::success($result);
    }
}
