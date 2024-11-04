<?php

namespace App\Http\Controllers\API\Symbols;

use App\Enums\QuoteInterval;
use App\Utils\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Mongo\Company\Company;
use App\Models\Mongo\Company\Quote;
use App\Models\Mongo\Company\Stash;
use App\Utils\QuoteIntervalIndex;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FluctuationController extends Controller
{
    public function __invoke(string $symbol)
    {
        $symbol = strtoupper($symbol);
        try {
            $stash = Stash::where("symbol", $symbol)
                ->project($this->getFluctuationProjection())
                ->firstOrFail();

            $recentQuotes = Quote::where("symbol", $symbol)
                ->where(
                    "interval",
                    QuoteIntervalIndex::get(QuoteInterval::DAILY)
                )
                ->orderBy("time", "desc")
                ->project($this->getQuoteProjection())
                ->limit(2)
                ->get();
        } catch (ModelNotFoundException $e) {
            return ApiResponse::notFound("Không tìm thấy công ty");
        }

        list($firstQuote, $secondQuote) = $recentQuotes;

        return ApiResponse::success(
            array_merge($firstQuote->toArray(), $stash->toArray(), [
                "previousClosingPrice" => $secondQuote["close"],
            ])
        );
    }

    private function getFluctuationProjection()
    {
        return [
            "avg52Week" => "\$fluctuation.week_52",
            "avg200day" => "\$fluctuation.day_200",
            "avg150day" => "\$fluctuation.day_150",
            "avg24day" => "\$fluctuation.day_24",
        ];
    }

    private function getQuoteProjection()
    {
        return ["time" => 0];
    }
}
