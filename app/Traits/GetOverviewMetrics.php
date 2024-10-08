<?php

namespace App\Traits;

use App\Models\Mongo\MetricRecord;

trait GetOverviewMetrics
{
    public function getOverviewMetrics(string $symbol, array $data = []): array
    {
        $symbol = strtoupper($symbol);
        $metricData = MetricRecord::where("symbol", $symbol)
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

        $metrics = [];
        $metrics["eps"] = round($metricSum["eps"], 2);
        $metrics["roe"] = round($metricSum["roe"], 2);
        $metrics["roa"] = round($metricSum["roa"], 2);

        // only calculate pe if firstQuote is passed in
        if (array_key_exists("lastDailyQuote", $data)) {
            $lastDailyQuote = $data["lastDailyQuote"];
            $metrics["pe"] = round(
                $lastDailyQuote["close"] / $metricSum["eps"],
                2
            );
        }

        $metrics["pb"] = round($metricSum["pb"] / 4, 2);

        return $metrics;
    }
}
