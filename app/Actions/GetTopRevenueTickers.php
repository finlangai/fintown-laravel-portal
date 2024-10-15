<?php

namespace App\Actions;

use App\Models\Mongo\Company\Company;
use App\Models\Mongo\Company\Stash;
use App\Traits\TickerProjection;
use Lorisleiva\Actions\Concerns\AsAction;

class GetTopRevenueTickers
{
    use AsAction, TickerProjection;
    public int $tickersLimit = 4;
    public int $quotesLimit = 21;

    public function handle(
        array $validated,
        MapTickerCardData $tickerMapper = new MapTickerCardData()
    ) {
        if (array_key_exists("limit", $validated)) {
            $this->tickersLimit = $validated["limit"];
        }

        $symbols = $this->getTopRevenueSymbols();
        $companies = Company::whereIn("symbol", $symbols)
            ->limit($this->tickersLimit)
            ->project($this->getTickerProjection())
            ->get();

        // handle zero length
        if (!$companies->count()) {
            return false;
        }
        $companies = $companies->toArray();

        $result = $tickerMapper->handle($companies, $this->quotesLimit);

        return $result;
    }

    public function getTopRevenueSymbols()
    {
        $stashs = Stash::orderBy("historical.revenue")
            ->whereNot("symbol", "VN30")
            ->limit($this->tickersLimit)
            ->project(["symbol" => 1])
            ->get()
            ->toArray();
        $symbols = [];
        foreach ($stashs as $stash) {
            $symbols[] = $stash["symbol"];
        }
        return $symbols;
    }
}
