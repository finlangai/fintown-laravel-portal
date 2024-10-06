<?php

namespace App\Actions;

use App\Models\Mongo\Company\Company;
use App\Models\Mongo\Company\Quote;
use App\Models\Mongo\MetricRecord;
use App\Traits\GetIntervalIndex;
use Lorisleiva\Actions\Concerns\AsAction;

class GetCompanyProfile
{
    use AsAction, GetIntervalIndex;

    public function handle(Company $profile)
    {
        $lastQuotesPair = Quote::orderBy("time", "desc")
            ->where("interval", $this->getIntervalIndex("1D"))
            ->where("symbol", $profile->symbol)
            ->project([
                "_id" => 0,
                "high" => 1,
                "low" => 1,
                "close" => 1,
                "volume" => 1,
            ])
            ->limit(2)
            ->get();

        // HLC
        $firstQuote = $lastQuotesPair[0];
        $profile["high"] = $firstQuote["high"];
        $profile["low"] = $firstQuote["low"];
        $profile["close"] = $firstQuote["close"];
        $profile["tradingVolume"] = $firstQuote["volume"];

        // Delta Percentage
        $profile["delta"] =
            ($firstQuote["close"] / $lastQuotesPair[1]["close"]) * 100 - 100;
        $profile["delta"] = round($profile["delta"], 2);

        // metrics
        $metricData = MetricRecord::where("symbol", $profile->symbol)
            ->where("quarter", "!=", 0)
            ->orderBy("year", "desc")
            ->orderBy("quarter", "desc")
            ->project([
                "_id" => 0,
                "eps" => "\$metrics.earnings_per_share",
                "pe" => "\$metrics.price_to_earnings",
                "pb" => "\$metrics.price_to_book",
                "roe" => "\$metrics.return_on_equity",
                "roa" => "\$metrics.return_on_assets",
            ])
            ->limit(4)
            ->get();

        $metricSum = [
            "eps" => 0,
            "pe" => 0,
            "pb" => 0,
            "roe" => 0,
            "roa" => 0,
        ];
        foreach ($metricData as $record) {
            foreach ($metricSum as $name => $value) {
                $metricSum[$name] += $record[$name];
            }
        }

        $profile["eps"] = round($metricSum["eps"], 2);
        $profile["pe"] = round($firstQuote["close"] / $metricSum["eps"], 2);

        // calculate average for pe, pb, roe, roa
        foreach (["pb", "roe", "roa"] as $metricName) {
            $profile[$metricName] = round($metricSum[$metricName] / 4, 2);
        }

        // convert marketCap to Billion unit
        $profile["marketCap"] = round($profile["marketCap"] / 1000000000);

        return $profile;
    }
}
