<?php

namespace App\Actions\Valuation;

use App\Models\Mongo\Company\Stash;
use App\Models\Mongo\Formular;
use App\Models\Mongo\MetricRecord;
use Lorisleiva\Actions\Concerns\AsAction;

class GetValuationParams
{
    use AsAction;

    public function handle(Formular $formularInfo, Stash $stash)
    {
        $vn30Stash = Stash::where("symbol", "VN30")->first();
        $metrics = $this->getLatestQuarterMetrics($stash->symbol);

        switch ($formularInfo["identifier"]) {
            case "price-to-earnings-relative-valuation":
                return [
                    "earnings_per_share" => round(
                        $metrics["earnings_per_share"],
                        2
                    ),
                    "price_to_earnings" => $vn30Stash["pe"],
                ];
                break;
            case "price-to-book-relative-valuation":
                return [
                    "book_value_per_share" => round(
                        $metrics["book_value_per_share"],
                        2
                    ),
                    "price_to_book" => $vn30Stash["pb"],
                ];
                break;
        }
    }

    public function getLatestQuarterMetrics(string $symbol)
    {
        return MetricRecord::where("symbol", $symbol)
            ->whereNot("quarter", 0)
            ->orderBy("year", "desc")
            ->orderBy("quarter", "desc")
            ->first()
            ->toArray()["metrics"];
    }
}
