<?php

namespace App\Http\Controllers\API\Symbols;

use App\Http\Controllers\Controller;
use App\Models\Mongo\Company\Company;
use App\Utils\ApiResponse;
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

        $summary = $company->toArray();

        // Trim and remove special characters from all paragraph
        foreach ($summary as &$paragraph) {
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

        return ApiResponse::success($summary);
    }

    private function getSummaryProjection(): array
    {
        return [
            "_id" => 0,
            "overview" => "\$summary.overview",
            "historyDev" => "\$summary.history_dev",
            "companyPromise" => "\$summary.company_promise",
            "businessRisk" => "\$summary.business_risk",
            "keyDevelopments" => "\$summary.business_strategies",
        ];
    }
}
