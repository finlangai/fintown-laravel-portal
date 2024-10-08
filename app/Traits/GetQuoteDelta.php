<?php

namespace App\Traits;

use App\Models\Mongo\Company\Quote;

trait GetQuoteDelta
{
    /**
     * Calculate the delta of a company on last daily closed price and the day before it
     *
     * @param string $symbol
     * @return array
     */
    public function getQuoteDelta(string $symbol): array
    {
        $lastQuotesPair = Quote::orderBy("time", "desc")
            ->where("interval", $this->getIntervalIndex("1D"))
            ->where("symbol", strtoupper($symbol))
            ->project([
                "_id" => 0,
                "open" => 1,
                "high" => 1,
                "low" => 1,
                "close" => 1,
                "volume" => 1,
            ])
            ->limit(2)
            ->get();

        $firstQuote = $lastQuotesPair[0];
        $secondQuote = $lastQuotesPair[1];

        $deltaRatio =
            ($firstQuote["close"] / $secondQuote["close"]) * 100 - 100;

        $delta = [
            "ratio" => round($deltaRatio, 2),
        ];

        return [$firstQuote, $delta, $secondQuote];
    }
}
