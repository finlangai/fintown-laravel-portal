<?php

namespace App\Http\Controllers\API\Symbols;

use App\Actions\GetCompanyProfile;
use App\Http\Controllers\Controller;
use App\Models\Mongo\Company\Company;
use App\Traits\Swagger\Symbols\ProfileAnnotation;
use App\Utils\ApiResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProfileController extends Controller
{
    use ProfileAnnotation;
    public function __invoke(string $symbol, GetCompanyProfile $action)
    {
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

        return ApiResponse::success($result);
    }
}
