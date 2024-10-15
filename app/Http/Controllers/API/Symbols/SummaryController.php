<?php

namespace App\Http\Controllers\API\Symbols;

use App\Actions\MapCompanySummary;
use App\Http\Controllers\Controller;
use App\Models\Mongo\Company\Company;
use App\Utils\ApiResponse;
use App\Utils\Redis;
use App\Utils\Unix;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class SummaryController extends Controller
{
    public function __invoke(string $symbol, MapCompanySummary $action)
    {
        $symbol = strtoupper($symbol);

        // check cache
        $cacheName = "symbols:summary:$symbol";
        if ($cache = Redis::get($cacheName)) {
            return ApiResponse::success($cache);
        }

        try {
            $company = Company::where("symbol", $symbol)
                ->project($this->getSummaryProjection())
                ->firstOrFail();
        } catch (ModelNotFoundException $e) {
            return ApiResponse::notFound("Không tìm thấy công ty");
        }

        $info = $company->toArray();
        $result = $action->handle($info);

        // caching
        Redis::set($cacheName, $result, Unix::hour(24));

        return ApiResponse::success($result);
    }

    private function getSummaryProjection(): array
    {
        return [
            "summary" => [
                "overview" => "\$summary.overview",
                "historyDev" => "\$summary.history_dev",
                "companyPromise" => "\$summary.company_promise",
                "businessRisk" => "\$summary.business_risk",
                "keyDevelopments" => "\$summary.business_strategies",
            ],
            "fundamental" => [
                "sic" => "\$symbol",
                "icbCode" => "\$icb_code",
                "internationName" => "\$profile.international_name",
                "headQuarters" => "\$profile.head_quarters",
                "phone" => "\$profile.phone",
                "fax" => "\$profile.fax",
                "email" => "\$profile.email",
                "taxIdNumber" => "\$profile.tax_id_number",
                "employees" => "\$profile.employees",
                "charterCapital" => "\$profile.charter_capital",
            ],
            "listingInfo" => [
                "exchange" => "\$profile.exchange",
                "dateOfListing" => "\$profile.date_of_listing",
                "initialListingPrice" => "\$profile.initial_listing_price",
                "dateOfIssue" => "\$profile.date_of_issue",
                "listingVolume" => "\$profile.listing_volume",
            ],
        ];
    }
}
