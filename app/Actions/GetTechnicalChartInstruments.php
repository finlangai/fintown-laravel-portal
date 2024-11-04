<?php

namespace App\Actions;

use App\Enums\InstrumentCategory;
use App\Traits\ProcessLimitAndOffset;
use App\Utils\ApiResponse;
use App\Utils\Util;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;
use MongoDB\Model\BSONDocument;

class GetTechnicalChartInstruments
{
    use AsAction, ProcessLimitAndOffset;

    private string $category;
    private ?int $limit = null;
    private ?int $offset = null;

    /**
     * This action aggregate data from 4 collection
     *
     * @param array $validated
     * @return mixed
     */
    public function handle(array $validated)
    {
        $this->category = $validated["category"];
        $this->processLimitAndOffset($validated);

        $isLoggedIn = auth("api")->check();

        // if the category is watchlist but no valid auth token, return unauthorized
        if (
            $this->category == InstrumentCategory::WATCHLIST->value &&
            !$isLoggedIn
        ) {
            return ApiResponse::unauthorized();
        }

        list($collectionName, $firstStages) = $this->getFirstStage();

        // build the aggregation pipeline
        $aggregationPipeline = [
            ...$firstStages,
            ...$this->getStagesForCompanyInfo(),
            ...$this->getStagesForLatestQuote(),
            ...$this->getStagesForDelta(),
        ];

        // === add watchlist checking stage if ig logged in
        if ($isLoggedIn) {
            $aggregationPipeline = array_merge(
                $aggregationPipeline,
                $this->getStagesForCheckingWatchlist(auth("api")->id())
            );
        }

        // connect to mongodb and get the collection
        $collection = DB::connection("mongodb")->getCollection($collectionName);
        // execute the aggregation
        $result = $collection->aggregate($aggregationPipeline)->toArray();

        // === Flatten the result and round the delta value
        $result = iterator_to_array($result);
        $result = array_map(function (BSONDocument $item) use ($isLoggedIn) {
            $flattened = Util::flattenLookUpAggregation($item->getArrayCopy());
            $flattened["delta"] = round($flattened["delta"], 2);
            // having isInWatchlist as false by default if not logged in
            if (!$isLoggedIn) {
                $flattened["isInWatchlist"] = false;
            }
            return $flattened;
        }, $result);

        // sort on symbol if not watchlist
        if ($this->category != InstrumentCategory::WATCHLIST->value) {
            usort($result, function ($a, $b) {
                return strcmp($a["symbol"], $b["symbol"]);
            });
        }

        return $result;
    }

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
