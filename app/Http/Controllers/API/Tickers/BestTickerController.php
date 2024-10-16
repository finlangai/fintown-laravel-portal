<?php

namespace App\Http\Controllers\API\Tickers;

use App\Http\Controllers\Controller;
use App\Models\Mongo\Company\Stash;
use App\Utils\ApiResponse;
use App\Utils\Redis;
use App\Utils\Unix;
use App\Utils\Util;
use Illuminate\Http\Request;
use MongoDB\Builder\Query;

class BestTickerController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $cacheName = "tickers:best";

        $cache = Redis::get($cacheName);
        if ($cache) {
            return ApiResponse::success($cache);
        }

        $rawData = $this->aggregateBestTicker()->first();
        $finalReponse = $rawData["company"][0];
        $finalReponse["assessment"] = $rawData["assessment"];

        // map npm into
        $historical = $rawData["year"];
        $npmHistories = $rawData["npm_histories"];
        $whatToSort = [&$historical, &$npmHistories];
        foreach ($whatToSort as &$records) {
            usort($records, fn($r1, $r2) => $r1["year"] > $r2["year"]);
        }

        // turn to billion unit
        array_walk_recursive($historical, function (&$item, $key) {
            if ($key == "year") {
                return;
            }

            $item /= 1000000000;
            $item = round($item, 2);
        });

        // populate npm into historical along with revenue and net profit
        foreach ($historical as $index => &$record) {
            $npmValue = $npmHistories[$index]["npm"];
            $record["npm"] = round($npmValue, 2);
        }

        // set historical field
        $finalReponse["historical"] = $historical;

        // set net profit field
        $finalReponse["netProfit"] = $historical[4]["net_profit"];

        // set cache
        Redis::set($cacheName, $finalReponse, Unix::day(1));

        return ApiResponse::success(Util::CamelizeArray($finalReponse));
    }

    public function aggregateBestTicker()
    {
        return Stash::aggregate()
            ->match(Query::query(is_best_by_npm: Query::eq(true)))
            ->project(
                symbol: 1,
                year: [
                    "year" => 1,
                    "revenue" => 1,
                    "net_profit" => 1,
                ],
                assessment: 1
            )
            ->lookup(
                from: "companies",
                let: ["symbol" => '$symbol'],
                pipeline: $this->getCompanyPipeline(),
                as: "company"
            )
            ->lookup(
                from: "metric_records",
                let: ["symbol" => '$symbol'],
                pipeline: $this->getMetricRecordsPipeline(),
                as: "npm_histories"
            );
    }

    public function getCompanyPipeline()
    {
        return [
            [
                '$match' => [
                    '$expr' => [
                        '$and' => [['$eq' => ['$symbol', '$$symbol']]],
                    ],
                ],
            ],
            [
                '$project' => [
                    "_id" => 0,
                    "symbol" => 1,
                    "logo" => 1,
                    "company_name" => 1,
                    "exchange" => '$profile.exchange',
                ],
            ],
        ];
    }

    public function getMetricRecordsPipeline()
    {
        return [
            [
                '$match' => [
                    '$expr' => [
                        '$and' => [
                            ['$eq' => ['$symbol', '$$symbol']],
                            ['$eq' => ['$quarter', 0]],
                        ],
                    ],
                ],
            ],
            [
                '$sort' => ["year" => -1],
            ],
            [
                '$limit' => 5,
            ],
            [
                '$project' => [
                    "_id" => 0,
                    "year" => 1,
                    "npm" => '$metrics.net_profit_margin',
                ],
            ],
        ];
    }
}
