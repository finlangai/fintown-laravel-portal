<?php

namespace App\Http\Controllers\API\Symbols;

use App\Actions\GetCompanyProfile;
use App\Http\Controllers\Controller;
use App\Models\Mongo\Company\Company;
use App\Models\Mongo\General\Watchlist;
use App\Traits\Swagger\Symbols\ProfileAnnotation;
use App\Utils\ApiResponse;
use App\Utils\Redis;
use App\Utils\Unix;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProfileController extends Controller
{
    use ProfileAnnotation;
    public function __invoke(string $symbol, GetCompanyProfile $action)
    {
        $isInWatchlist = Watchlist::checkSymbol($symbol);

        $cacheName = "symbols:profile:$symbol:";
        $cache = Redis::get($cacheName);
        if ($cache) {
            $cache["isInWatchlist"] = $isInWatchlist;
            return ApiResponse::success($cache);
        }

        try {
            $company = Company::where("symbol", strtoupper($symbol))
                ->project([
                    "_id" => 0,
                    "symbol" => 1,
                    "companyName" => "\$company_name",
                    "logo" => 1,
                    "industry" => 1,
                    "exchange" => "\$profile.exchange",
                    "website" => "\$profile.web_address",
                    "overview" => "\$summary.overview",
                    "marketCap" => "\$profile.market_cap",
                    "listingVolume" => "\$profile.listing_volume",
                    "tradingVolume" => "\$profile.trading_volume",
                ])
                ->firstOrFail();
        } catch (ModelNotFoundException $e) {
            return ApiResponse::notFound("Không tìm thấy công ty");
        }

        $result = $action->handle($company);
        Redis::set($cacheName, $result, Unix::untilNextHour(4));

        $result["isInWatchlist"] = $isInWatchlist;

        return ApiResponse::success($result);
    }
}
