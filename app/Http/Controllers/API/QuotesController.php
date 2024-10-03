<?php

namespace App\Http\Controllers\API;

use App\Enums\QuoteType;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\QuotesRequest;
use App\Models\Mongo\Company\Quote;
use App\Traits\Swagger\Symbols\QuotesAnnotation;
use App\Utils\ApiResponse;

class QuotesController extends Controller
{
    use QuotesAnnotation;
    public function __invoke(string $symbol, QuotesRequest $request)
    {
        // handle not found

        $validated = $request->validated();
        $intervalIndex = $this->getIntervalIndex($validated["interval"]);
        $DEFAULT_LIMIT = 100;

        $query = Quote::whereRaw([
            "time" => [
                '$gte' => intval($validated["start"]),
                '$lte' => intval($validated["end"]),
            ],
            "interval" => $intervalIndex,
            "symbol" => strtoupper($symbol),
        ])->orderBy("time", "desc");

        // limit the amount of quotes
        if (array_key_exists("limit", $validated)) {
            $query->limit($validated["limit"]);
        } else {
            $query->limit($DEFAULT_LIMIT);
        }

        // skipping records if offset is specified
        if (array_key_exists("offset", $validated)) {
            $query->skip($validated["offset"]);
        }

        // the type of quotes
        if ($validated["type"] == QuoteType::MINIMAL->value) {
            $query->project([
                "time" => 1,
                "price" => '$close',
            ]);
        }

        $result = $query->get();

        if (!$result->count()) {
            return ApiResponse::notFound("Không tìm thấy dữ liệu giá cổ phiếu");
        }

        return ApiResponse::success($result);
    }

    private function getIntervalIndex(string $interval): int
    {
        return [
            "1m" => 0,
            "1H" => 4,
            "1D" => 5,
            "1W" => 6,
            "1M" => 7,
        ][$interval];
    }
}
