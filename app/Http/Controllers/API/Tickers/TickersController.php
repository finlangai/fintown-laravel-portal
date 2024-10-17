<?php

namespace App\Http\Controllers\API\Tickers;

use App\Actions\FilterTickersList;
use App\Actions\PopulateTickers;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\TickersRequest;
use App\Models\Mongo\Company\Company;
use App\Models\Mongo\Company\Stash;
use App\Traits\Swagger\Tickers\TickersAnnotation;
use App\Utils\ApiResponse;
use App\Utils\Redis;
use App\Utils\Unix;

class TickersController extends Controller
{
    use TickersAnnotation;

    public function total()
    {
        $total = Company::count();
        return ApiResponse::success(["total" => $total]);
    }

    public function overview()
    {
        $vn30Stash = Stash::where("symbol", "VN30")->first()->toArray();
        unset($vn30Stash["symbol"]);
        $billionList = ["revenue", "marketcap", "earnings", "equity"];
        foreach ($billionList as $key) {
            $vn30Stash[$key] /= 1000000000;
        }
        foreach ($vn30Stash as $key => &$value) {
            $value = round($value, 2);
        }
        $vn30Stash["total"] = Company::count();
        return ApiResponse::success($vn30Stash);
    }

    public function __invoke(TickersRequest $request, FilterTickersList $action)
    {
        $validated = $request->validated();
        $result = $action->handle($validated);

        return ApiResponse::success($result);
    }

}
