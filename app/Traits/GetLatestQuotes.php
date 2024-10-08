<?php

namespace App\Traits;

use App\Enums\QuoteInterval;
use App\Models\Mongo\Company\Quote;
use App\Utils\QuoteIntervalIndex;

trait GetLatestQuotes
{
    public function getLatestQuotes(
        array $symbols,
        int $limit,
        QuoteInterval $intervalType = QuoteInterval::DAILY
    ) {
        return Quote::raw(
            fn($collection) => $collection
                ->aggregate(
                    [
                        [
                            '$match' => [
                                "symbol" => ['$in' => $symbols],
                                "interval" => QuoteIntervalIndex::get(
                                    $intervalType
                                ),
                            ],
                        ],
                        [
                            '$sort' => [
                                "time" => -1,
                            ],
                        ],
                        [
                            '$group' => [
                                "_id" => '$symbol',
                                "quotes" => [
                                    '$push' => [
                                        "time" => '$time',
                                        "price" => '$close',
                                    ],
                                ],
                            ],
                        ],
                        [
                            '$project' => [
                                "_id" => 0,
                                "k" => '$_id',
                                "v" => ['$slice' => ['$quotes', $limit]],
                            ],
                        ],
                        [
                            '$group' => [
                                "_id" => null,
                                "result" => [
                                    '$push' => [
                                        "k" => '$k',
                                        "v" => '$v',
                                    ],
                                ],
                            ],
                        ],
                        [
                            '$replaceRoot' => [
                                "newRoot" => [
                                    '$arrayToObject' => '$result',
                                ],
                            ],
                        ],
                    ],
                    [
                        "allowDiskUse" => true,
                    ]
                )
                ->toArray()[0]
        );
    }
}
