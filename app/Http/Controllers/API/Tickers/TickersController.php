<?php

namespace App\Http\Controllers\API\Tickers;

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

    public int $tickersLimit = 10;
    public int $tickersOffset = 0;

    public string $cacheName = "tickers:list:";

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

    public function __invoke(TickersRequest $request, PopulateTickers $action)
    {
        $validated = $request->validated();

        $query = Company::orderBy("profile.market_cap", "desc")->project(
            $this->getTickerProjection()
        );

        if (array_key_exists("limit", $validated)) {
            $this->tickersLimit = $validated["limit"];
        }

        if (array_key_exists("offset", $validated)) {
            $this->tickersOffset = $validated["offset"];
        }
        // Check if cached
        $cache = $this->getCache();
        if ($cache) {
            return ApiResponse::success($cache);
        }

        $query->skip($this->tickersOffset);
        $query->limit($this->tickersLimit);
        $tickers = $query->get();

        // handle zero length collection
        if (!$tickers->count()) {
            return ApiResponse::notFound();
        }

        $result = $action->handle($tickers);
        // caching
        Redis::set($this->cacheName, $result, Unix::hour(12));

        return $result;
    }

    public function getCache()
    {
        $this->cacheName .= $this->tickersLimit . ":" . $this->tickersOffset;
        $cache = Redis::get($this->cacheName);
        return $cache;
    }

    private function getTickerProjection(): array
    {
        return [
            "_id" => 0,
            "symbol" => 1,
            "companyName" => "\$company_name",
            "logo" => 1,
            "industry" => "\$industry",
            "marketCap" => "\$profile.market_cap",
            "weeklyDelta" => "\$delta.delta_in_week",
            "yearlyDelta" => "\$delta.delta_in_year",
            "exchange" => "\$profile.exchange",
        ];
    }
}
