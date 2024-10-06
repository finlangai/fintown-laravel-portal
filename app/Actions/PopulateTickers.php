<?php

namespace App\Actions;

use App\Traits\GetIntervalIndex;
use App\Traits\GetOverviewMetrics;
use App\Traits\GetQuoteDelta;
use Illuminate\Support\Collection;
use Lorisleiva\Actions\Concerns\AsAction;

class PopulateTickers
{
    use GetOverviewMetrics, GetQuoteDelta, GetIntervalIndex;
    use AsAction;

    public function handle(Collection $tickers)
    {
        $tickers = $tickers->toArray();

        foreach ($tickers as $index => $t) {
            $currentTicker = &$tickers[$index];
            $symbol = &$currentTicker["symbol"];

            $currentTicker["marketCap"] = round(
                $currentTicker["marketCap"] / 1000000000
            );
            // daily price and delta
            list($firstQuote, $delta) = $this->getQuoteDelta($symbol);

            $currentTicker["dailyDelta"] = $delta["ratio"];
            $currentTicker["weeklyDelta"] = round(
                $currentTicker["weeklyDelta"] * 100,
                2
            );
            $currentTicker["yearlyDelta"] = round(
                $currentTicker["yearlyDelta"] * 100,
                2
            );

            $currentTicker["price"] = $firstQuote["close"];

            // metric
            $metrics = $this->getOverviewMetrics(
                $symbol,
                data: ["lastDailyQuote" => $firstQuote]
            );

            $currentTicker["pe"] = $metrics["pe"];
            $currentTicker["pb"] = $metrics["pb"];
            $currentTicker["roe"] = $metrics["roe"];
        }
        return $tickers;
    }
}
