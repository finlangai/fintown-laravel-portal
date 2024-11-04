<?php

namespace App\Traits\Stages;

use App\Enums\InstrumentCategory;

trait TechnicalChartInstrumentsStages
{
    public function getFirstStage()
    {
        $startingCollectionName = "";
        $firstStages = [];

        $quantifyStages = [];
        // check on limit and offset, not applying to VN30
        if ($this->category != InstrumentCategory::VN30->value) {
            // skipping stage has to be before limit stage
            if ($this->offset) {
                $quantifyStages[] = ['$skip' => $this->offset];
            }
            if ($this->limit) {
                $quantifyStages[] = ['$limit' => $this->limit];
            }
        }

        // this if for default case
        $symbolSearchStages = [];
        if ($this->search) {
            $symbolSearchStages[] = [
                '$match' => [
                    "symbol" => ['$regex' => $this->search, '$options' => "i"],
                ],
            ];
        }

        switch ($this->category) {
            case InstrumentCategory::WATCHLIST->value:
                $startingCollectionName = "watchlists";
                $firstStages = [
                    ['$match' => ["_id" => auth("api")->id()]],
                    ...$quantifyStages,
                    ['$project' => ["symbol" => '$symbols', "_id" => 0]],
                ];

                break;
            case InstrumentCategory::VN30->value:
                $startingCollectionName = "stash";
                $firstStages = [
                    ['$match' => ["is_stock" => ['$ne' => false]]],
                    ['$sort' => ["stats.marketcap" => -1]],
                    ['$limit' => 30],
                    [
                        '$group' => [
                            "_id" => null,
                            "symbol" => ['$addToSet' => '$symbol'],
                        ],
                    ],
                    ['$project' => ["symbol" => 1, "_id" => 0]],
                ];

                break;

            default:
                // DEFAULT IS FILTER ON EXCHANGE WHICH ARE HSX and HOSE
                $startingCollectionName = "stash";
                $firstStages = [
                    [
                        '$match' => [
                            "is_stock" => ['$ne' => false],
                            "exchange" => strtoupper($this->category),
                        ],
                    ],
                    ...$symbolSearchStages,
                    ...$quantifyStages,
                    [
                        '$group' => [
                            "_id" => null,
                            "symbol" => ['$addToSet' => '$symbol'],
                        ],
                    ],
                    ['$project' => ["symbol" => 1, "_id" => 0]],
                ];

                break;
        }

        // unwinding
        $firstStages = [...$firstStages, ['$unwind' => '$symbol']];

        return [$startingCollectionName, $firstStages];
    }

    public function getStagesForCompanyInfo()
    {
        return [
            [
                '$lookup' => [
                    "from" => "companies",
                    "localField" => "symbol",
                    "foreignField" => "symbol",
                    "pipeline" => [['$project' => ["_id" => 0, "logo" => 1]]],
                    "as" => "companyInfo",
                ],
            ],
        ];
    }

    public function getStagesForLatestQuote()
    {
        return [
            [
                '$lookup' => [
                    "from" => "stock_quotes",
                    "localField" => "symbol",
                    "foreignField" => "symbol",
                    "pipeline" => [
                        ['$match' => ["interval" => 5]],
                        ['$sort' => ["time" => -1]],
                        ['$limit' => 1],
                        [
                            '$project' => [
                                "_id" => 0,
                                "price" => '$close',
                                "volume" => 1,
                            ],
                        ],
                    ],
                    "as" => "latestQuote",
                ],
            ],
        ];
    }

    public function getStagesForDelta()
    {
        return [
            [
                '$lookup' => [
                    "from" => "stash",
                    "localField" => "symbol",
                    "foreignField" => "symbol",
                    "pipeline" => [
                        [
                            '$project' => [
                                "_id" => 0,
                                "delta" => '$delta.daily.percent',
                            ],
                        ],
                    ],
                    "as" => "delta",
                ],
            ],
        ];
    }

    public function getStagesForCheckingWatchlist(int $userId)
    {
        return [
            [
                '$lookup' => [
                    "from" => "watchlists",
                    "let" => ["symbol" => '$symbol'],
                    "pipeline" => [
                        ['$match' => ['$expr' => ['$eq' => ['$_id', $userId]]]],
                        [
                            '$project' => [
                                "_id" => 0,
                                "isInWatchlist" => [
                                    '$in' => ['$$symbol', '$symbols'],
                                ],
                            ],
                        ],
                    ],
                    "as" => "watchlist_check",
                ],
            ],
        ];
    }
}
