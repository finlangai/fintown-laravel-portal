<?php

namespace App\Actions;

use App\Models\Mongo\Company\Company;
use App\Models\Mongo\MetricRecord;
use App\Traits\GetIntervalIndex;
use App\Traits\GetOverviewMetrics;
use App\Traits\GetQuoteDelta;
use Lorisleiva\Actions\Concerns\AsAction;

class GetCompanyProfile
{
    use AsAction, GetIntervalIndex, GetQuoteDelta, GetOverviewMetrics;

    public function handle(Company $profile)
    {
        list($firstQuote, $delta) = $this->getQuoteDelta($profile->symbol);

        // HLC
        $profile["high"] = $firstQuote["high"];
        $profile["low"] = $firstQuote["low"];
        $profile["close"] = $firstQuote["close"];
        $profile["tradingVolume"] = $firstQuote["volume"];

        // Delta Percentage
        $profile["delta"] = $delta["ratio"];

        $metrics = $this->getOverviewMetrics(
            $profile->symbol,
            data: ["lastDailyQuote" => $firstQuote]
        );

        foreach ($metrics as $key => $value) {
            $profile[$key] = $value;
        }

        // convert marketCap to Billion unit
        $profile["marketCap"] = round($profile["marketCap"] / 1000000000);

        return $profile;
    }
}
