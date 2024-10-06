<?php

namespace App\Actions;

use App\Traits\GetLatestQuotes;
use Lorisleiva\Actions\Concerns\AsAction;

class MapTickerCardData
{
    use AsAction, GetLatestQuotes;

    public function handle(array $companies, int $quotesLimit)
    {
        $symbols = array_map(fn($company) => $company["symbol"], $companies);

        $quotesDict = $this->getLatestQuotes($symbols, $quotesLimit);

        foreach ($companies as $index => $c) {
            $company = &$companies[$index];
            $symbol = $companies[$index]["symbol"];

            // embed quotes
            $company["quotes"] = $quotesDict[$symbol];

            // calculating delta
            $firstQuote = &$company["quotes"][0];
            $company["price"] = $firstQuote["price"];

            $delta = &$company["delta"];
            $delta = round($delta * 100, 2);
        }

        return $companies;
    }
}
