<?php

namespace App\Http\Controllers\API\Symbols;

use App\Utils\Unix;
use App\Utils\Redis;
use App\Utils\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Mongo\Company\InternalTransaction;
use App\Http\Requests\API\InternalTransactionsRequest;
use App\Traits\ProcessLimitAndOffset;
use App\Traits\TimeRangeConditions;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class InternalTransactionsController extends Controller
{
    use ProcessLimitAndOffset, TimeRangeConditions;

    public int $limit = 20;
    public int $offset = 0;

    // -1 mean non filter
    public int $start = -1;
    public int $end = -1;

    public function __invoke(
        string $symbol,
        InternalTransactionsRequest $request
    ) {
        $validated = $request->validated();
        // uppercasing symbol param for later use
        $symbol = strtoupper($symbol);

        // check parameters
        $this->checkParameters($validated);

        // define cache name for later use symbols:symbol:start:end:limit:offset
        $cacheName = "symbols:$symbol:transactions:$this->start:$this->end:$this->limit:$this->offset";
        // === Check if cached
        $cache = Redis::get($cacheName);
        if ($cache) {
            return ApiResponse::success($cache);
        }

        // getting transaction, must be called after checking parameters
        $transactions = $this->getTransactions($symbol);

        // 404
        if (!$transactions->count()) {
            return ApiResponse::notFound(
                "Không tìm thấy dữ liệu lịch sử giao dịch nội bộ"
            );
        }
        // reformat fields
        $transactions = $transactions->toArray();
        foreach ($transactions as &$t) {
            $t["ownership"] = round($t["ownership"] * 100, 3);
        }
        $result = [
            "total" => $this->getTransactionCount($symbol),
            "records" => $transactions,
        ];

        // === set cache
        Redis::set($cacheName, $transactions, Unix::hour(24));

        return ApiResponse::success($result);
    }

    /**
     * Checking on parameters and set instance variables
     *
     * @param array $validated
     * @return void
     */
    public function checkParameters(array $validated): void
    {
        // take a look at params: limit, offset
        $this->processLimitAndOffset($validated);

        // check on start and end
        if (array_key_exists("start", $validated)) {
            $this->start = $validated["start"];
        }

        if (array_key_exists("end", $validated)) {
            $this->end = $validated["end"];
        }
    }

    /**
     * Get the total amount of transaction whether there are filter or not
     *
     * @param string $symbol
     * @return integer
     */
    public function getTransactionCount(string $symbol): int
    {
        $timeField = "published_date";
        $countQuery = InternalTransaction::where("symbol", $symbol);

        $countQuery = $this->addTimeRangeConditions($countQuery, $timeField);

        return $countQuery->count();
    }

    public function getTransactions(string $symbol): Collection
    {
        $timeField = "published_date";
        $query = InternalTransaction::where("symbol", $symbol)
            ->orderBy($timeField, "desc")
            ->limit($this->limit)
            ->skip($this->offset)
            ->project($this->getInternalTransactionProjection());

        $query = $this->addTimeRangeConditions($query, $timeField);

        return $query->get();
    }

    public function getInternalTransactionProjection(): array
    {
        return [
            "ownership" => 1,
            "volumeBeforeTransaction" => "\$volume_before_transaction",
            "volumeAfterTransaction" => "\$volume_after_transaction",
            "transactioner" => [
                "name" => "\$transaction_man",
                "position" => "\$transaction_man_position",
            ],
            "related" => [
                "name" => "\$related_man",
                "position" => "\$related_man_position",
            ],
            "plan" => [
                "buyVolume" => "\$plan_buy_volume",
                "sellVolume" => "\$plan_sell_volume",
                "beginDate" => "\$plan_begin_date",
                "endDate" => "\$plan_end_date",
            ],
            "result" => [
                "buyVolume" => "\$real_buy_volume",
                "sellVolume" => "\$real_sell_volume",
                "executionDate" => "\$real_end_date",
            ],
        ];
    }
}
