<?php

namespace App\Actions;

use App\Models\Mongo\Company\Stash;
use Lorisleiva\Actions\Concerns\AsAction;
use MongoDB\Builder\Query;
use MongoDB\Collection;

class AggregateTickersTechnicalChartOverview
{
    use AsAction;

    public function handle()
    {
        $result = $this->aggregate()[0];
        $result["totalMarketCap"] = $result["totalMarketCap"] / 1000000000;
        $result["totalMarketCap"] = round($result["totalMarketCap"], 2);
        $result["highestDeltaPercent"] = round(
            $result["highestDeltaPercent"],
            2
        );
        return $result;
    }

    public function aggregate()
    {
        return Stash::raw(
            fn(Collection $collection) => $collection->aggregate([
                // Match documents where 'is_stock' is not false
                ['$match' => ["is_stock" => ['$ne' => false]]],

                // Group to sum marketcap and count documents
                ...$this->getMarketcapSumAndCountStages(),

                ...$this->getHighestDeltaSymbolStages(),
                // Add fields to capture the highest delta daily percentage symbol at root level
                ...$this->getTotalTradingVolumeStages(),

                // Project final output
                [
                    '$project' => [
                        "totalMarketCap" => 1,
                        "totalTickers" => '$count',
                        "highestDeltaSymbol" => 1,
                        "highestDeltaPercent" => 1,
                        "totalTradingVolume" => 1,
                    ],
                ],
            ])
        );
        // end of aggregate
    }

    public function getMarketcapSumAndCountStages(): array
    {
        return [
            [
                '$group' => [
                    "_id" => null,
                    "totalMarketCap" => ['$sum' => '$stats.marketcap'],
                    "count" => ['$sum' => 1],
                    "symbols" => [
                        '$push' => [
                            "symbol" => '$symbol',
                            "deltaDailyPercentage" => '$delta.daily.percent',
                        ],
                    ],
                ],
            ],
        ];
    }

    public function getHighestDeltaSymbolStages(): array
    {
        return [
            [
                '$addFields' => [
                    "highestDeltaSymbol" => [
                        '$arrayElemAt' => [
                            [
                                '$sortArray' => [
                                    "input" => '$symbols',
                                    "sortBy" => [
                                        "deltaDailyPercentage" => -1,
                                    ],
                                ],
                            ],
                            0,
                        ],
                    ],
                ],
            ],
            [
                '$addFields' => [
                    "highestDeltaSymbol" => '$highestDeltaSymbol.symbol',
                    "highestDeltaPercent" =>
                        '$highestDeltaSymbol.deltaDailyPercentage',
                ],
            ],
        ];
    }
    public function getTotalTradingVolumeStages(): array
    {
        return [
            [
                '$lookup' => [
                    "from" => "stock_quotes",
                    "pipeline" => [
                        [
                            '$match' => ["interval" => 5],
                        ],
                        [
                            '$sort' => ["time" => -1],
                        ],
                        [
                            '$group' => [
                                "_id" => '$symbol',
                                "latestVolume" => ['$first' => '$volume'],
                            ],
                        ],
                        [
                            '$group' => [
                                "_id" => null,
                                "totalTradingVolume" => [
                                    '$sum' => '$latestVolume',
                                ],
                            ],
                        ],
                    ],
                    "as" => "latest_quotes",
                ],
            ],
            [
                '$addFields' => [
                    "totalTradingVolume" => [
                        '$arrayElemAt' => [
                            '$latest_quotes.totalTradingVolume',
                            0,
                        ],
                    ],
                ],
            ],
        ];
    }
}
