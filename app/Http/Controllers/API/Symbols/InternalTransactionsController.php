<?php

namespace App\Http\Controllers\API\Symbols;

use App\Utils\Unix;
use App\Utils\Redis;
use App\Utils\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Mongo\Company\InternalTransaction;
use App\Http\Requests\API\InternalTransactionsRequest;
use App\Traits\ProcessLimitAndOffset;
use App\Utils\Util;
use Illuminate\Support\Collection;

class InternalTransactionsController extends Controller
{
    use ProcessLimitAndOffset;

    public int $limit = 20;
    public int $offset = 0;

    public function __invoke(
        string $symbol,
        InternalTransactionsRequest $request
    ) {
        $validated = $request->validated();
        // uppercasing symbol param for later use
        $symbol = strtoupper($symbol);

        // take a look at params: limit, offset
        $this->processLimitAndOffset($validated);

        // define cache name for later use
        $cacheName = "symbols:$symbol:transactions:$this->limit:$this->offset";

        // Check if cached
        $cache = Redis::get($cacheName);
        if ($cache) {
            return ApiResponse::success($cache);
        }

        $transactions = $this->getTransactions($symbol);

        // 404
        if (!$transactions->count()) {
            return ApiResponse::notFound("Không tìm thấy dữ liệu cổ đông");
        }
        // reformat fields
        $transactions = $transactions->toArray();
        foreach ($transactions as &$t) {
            $t["ownership"] = round($t["ownership"] * 100, 3);
        }

        // set cache
        // Redis::set($cacheName, $transactions, Unix::hour(24));

        return ApiResponse::success($transactions);
    }

    public function getTransactions(string $symbol): Collection
    {
        return InternalTransaction::where("symbol", $symbol)
            ->orderBy("order_date", "desc")
            ->limit($this->limit)
            ->skip($this->offset)
            ->project($this->getInternalTransactionProjection())
            ->get();
    }

    public function getInternalTransactionProjection(): array
    {
        return [
            "ownership" => 1,
            "volumeBeforeTransaction" => "\$volume_before_transaction",
            "volumeAfterTransaction" => "\$volume_after_transaction",
            "transitioner" => [
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
