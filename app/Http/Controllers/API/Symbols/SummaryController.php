<?php

namespace App\Http\Controllers\API\Symbols;

use App\Http\Controllers\Controller;
use App\Models\Mongo\Company\Company;
use App\Utils\ApiResponse;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class SummaryController extends Controller
{
    public function __invoke(string $symbol)
    {
        try {
            $company = Company::where("symbol", strtoupper($symbol))
                ->project($this->getSummaryProjection())
                ->firstOrFail();
        } catch (ModelNotFoundException $e) {
            return ApiResponse::notFound("Không tìm thấy công ty");
        }

        $info = $company->toArray();

        // Trim and remove special characters from all paragraph
        foreach ($info["summary"] as &$paragraph) {
            // trim and remove the special character to see if it's null
            $paragraph = trim(str_replace("  ", "", $paragraph));
            if (!$paragraph) {
                $paragraph = null;
                continue;
            }

            // split the paragraph by ';'
            $paragraph = explode(";", $paragraph);

            // loop through and reformat each chunk in the paragraph
            foreach ($paragraph as $index => &$chunk) {
                $chunk = trim($chunk);
                if (!$chunk) {
                    unset($paragraph[$index]);
                }
            }
        }

        // format the date for listingInfo
        $dateOfIssue = &$info["listingInfo"]["dateOfIssue"];
        $dateOfListing = &$info["listingInfo"]["dateOfListing"];

        $dateToParse = [&$dateOfIssue, &$dateOfListing];
        foreach ($dateToParse as &$dateString) {
            if (isset($dateString)) {
                $date = Carbon::parse($dateString);
                $dateString = $date->format("d-m-Y");
            }
        }

        return ApiResponse::success($info);
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
