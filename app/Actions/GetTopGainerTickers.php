<?php

namespace App\Actions;

use App\Models\Mongo\Company\Company;
use App\Traits\GetLatestQuotes;
use App\Traits\TickerProjection;
use Lorisleiva\Actions\Concerns\AsAction;

class GetTopGainerTickers
{
    use AsAction, GetLatestQuotes, TickerProjection;

    private int $tickersLimit = 4;
    private int $quotesLimit = 21;

    public function handle(
        array $validated,
        MapTickerCardData $tickerMapper = new MapTickerCardData()
    ) {
        if (array_key_exists("limit", $validated)) {
            $this->tickersLimit = $validated["limit"];
        }

        $companies = Company::orderBy("delta.delta_in_week", "desc")
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
}
