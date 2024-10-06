<?php

namespace App\Actions;

use App\Models\Mongo\Company\Company;
use App\Traits\GetLatestQuotes;
use App\Traits\TickerProjection;
use Lorisleiva\Actions\Concerns\AsAction;

class GetTickerByIndustry
{
    use AsAction, GetLatestQuotes, TickerProjection;

    public function __construct(
        private int $tickersLimit = 4,
        private int $quotesLimit = 21
    ) {
    }
    public function handle(array $validated): array|false
    {
        $industryName = $validated["name"];

        if (array_key_exists("limit", $validated)) {
            $this->tickersLimit = $validated["limit"];
        }

        $companies = Company::where("industry", $industryName)
            ->limit($this->tickersLimit)
            ->project($this->getTickerProjection())
            ->get();

        // handle zero length
        if (!$companies->count()) {
            return false;
        }

        $companies = $companies->toArray();

        $symbols = array_map(fn($company) => $company["symbol"], $companies);

        $quotesDict = $this->getLatestQuotes($symbols, $this->quotesLimit);

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
