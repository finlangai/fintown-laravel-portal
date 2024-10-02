<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\QuotesRequest;
use App\Models\Mongo\Company\Quote;
use App\Traits\Swagger\Symbols\QuotesAnnotation;
use App\Utils\ApiResponse;

use function PHPSTORM_META\type;

class QuotesController extends Controller
{
    use QuotesAnnotation;
    public function __invoke(string $symbol, QuotesRequest $request)
    {
        // handle not found

        $validated = $request->validated();
        $intervalIndex = $this->getIntervalIndex($validated["interval"]);

        $query = Quote::whereRaw([
            "time" => [
                '$gte' => intval($validated["start"]),
                '$lte' => intval($validated["end"]),
            ],
            "interval" => $intervalIndex,
            "symbol" => strtoupper($symbol),
        ]);

        if (array_key_exists("limit", $validated)) {
            $query->limit($validated["limit"]);
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
