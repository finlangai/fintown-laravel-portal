<?php

namespace App\Actions;

use App\Models\Mongo\Company\Stash;
use App\Traits\ProcessLimitAndOffset;
use App\Utils\Redis;
use App\Utils\Unix;
use Lorisleiva\Actions\Concerns\AsAction;
use MongoDB\Builder\Expression;
use MongoDB\Builder\Query;
use MongoDB\Builder\Type\Sort;

class FilterTickersList
{
    use AsAction, ProcessLimitAndOffset;

    public int $limit = 10;
    public int $offset = 0;

    public string $sortField = "marketcap";
    public $sortOrder = "desc";

    // sortField, sortOrder, limit, offset
    public string $cacheName = "tickers:list:%s:%s:%d:%d";

    public function handle(array $validated)
    {
        // checking on parameters
        $this->checkParameters($validated);
        // get che must be called after checking parameters
        $this->cacheName = sprintf(
            $this->cacheName,
            $this->sortField,
            $this->sortOrder,
            $this->limit,
            $this->offset
        );
        $cache = Redis::get($this->cacheName);
        if ($cache) {
            return $cache;
        }

        // set true sort field and sort order for aggregation
        $this->sortField = $this->getTrueSortField($this->sortField);
        $this->sortOrder = $this->sortOrder == "desc" ? Sort::Desc : Sort::Asc;

        // field to round to 2 digits
        $roundingFields = [
            "pb",
            "pe",
            "roe",
            "marketCap",
            "dailyDelta",
            "weeklyDelta",
            "yearlyDelta",
        ];
        $tickers = $this->aggregateTickers()->toArray();

        foreach ($tickers as &$t) {
            // bring company object to root level
            $t = array_merge($t, $t["company"][0]);
            unset($t["company"]);

            // turn marketcap to billion unit
            $t["marketCap"] /= 1000000000;

            foreach ($roundingFields as $fieldName) {
                $t[$fieldName] = round($t[$fieldName], 2);
            }
        }

        // set cache
        Redis::set($this->cacheName, $tickers, Unix::hour(6));

        return $tickers;
    }

    /**
     * Checking on validated parameters and set if present
     *
     * @param array $validated
     * @return void
     */
    public function checkParameters(array $validated): void
    {
        // checking on limit and offset
        $this->processLimitAndOffset($validated);

        // checking on sort and sort order
        if (array_key_exists("sortOn", $validated)) {
            $this->sortField = $validated["sortOn"];
        }

        if (array_key_exists("sortOrder", $validated)) {
            $this->sortOrder = $validated["sortOrder"];
        }
    }

    /**
     * Get true sort field inside the database
     *
     * @param string $fieldName
     * @return string
     */
    public function getTrueSortField(string $fieldName): string
    {
        return [
            "marketcap" => "stats.marketcap",
            "price" => "stats.last_closed_price",
            "dailyDelta" => "delta.daily.percent",
            "weeklyDelta" => "delta.weekly.percent",
            "yearlyDelta" => "delta.yearly.percent",
            "pe" => "stats.pe_ltm",
            "pb" => "stats.pb_ltm",
            "roe" => "stats.roe_ltm",
            "exchange" => "exchange",
            "industry" => "industry",
        ][$fieldName];
    }

    public function aggregateTickers()
    {
        return Stash::aggregate()
            // cuz there are VN30 in the same array
            ->match(is_stock: Query::ne(false))
            ->sort(
                ...[
                    $this->sortField => $this->sortOrder,
                ]
            )
            ->skip($this->offset)
            ->limit($this->limit)
            ->project(
                ...[
                    "_id" => 0,
                    "symbol" => 1,
                    "price" => '$stats.last_closed_price',
                    "pe" => '$stats.pe_ltm',
                    "pb" => '$stats.pb_ltm',
                    "roe" => '$stats.roe_ltm',
                    "marketCap" => '$stats.marketcap',
                    "dailyDelta" => '$delta.daily.percent',
                    "weeklyDelta" => '$delta.weekly.percent',
                    "yearlyDelta" => '$delta.yearly.percent',
                ]
            )
            ->lookup(
                from: "companies",
                let: ["symbol" => '$symbol'],
                pipeline: $this->getCompanyPipeline(),
                as: "company"
            )
            ->get();
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
                    "logo" => 1,
                    "companyName" => '$company_name',
                    "industry" => '$industry',
                    "exchange" => '$profile.exchange',
                ],
            ],
        ];
    }
}
