<?php

namespace App\Http\Controllers\API\Symbols;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\OfficersRequest;
use App\Models\Mongo\Company\Officer;
use App\Utils\ApiResponse;
use App\Utils\Redis;
use App\Utils\Unix;

class OfficersController extends Controller
{
    public int $officerLimit = 9;
    public int $officerOffset = 0;
    public function __invoke(string $symbol, OfficersRequest $request)
    {
        $validated = $request->validated();
        $symbol = strtoupper($symbol);

        if (array_key_exists("limit", $validated)) {
            $this->officerLimit = $validated["limit"];
        }

        if (array_key_exists("offset", $validated)) {
            $this->officerOffset = $validated["offset"];
        }

        $cacheName = "symbols:$symbol:officers:$this->officerLimit:$this->officerOffset";
        // Check if cached
        $cache = Redis::get($cacheName);
        if ($cache) {
            return ApiResponse::success($cache);
        }

        $officers = Officer::where("symbol", $symbol)
            ->orderBy("position_id", "asc")
            ->limit($this->officerLimit)
            ->skip($this->officerOffset)
            ->with("position")
            ->get();

        if (!$officers->count()) {
            return ApiResponse::notFound();
        }
        $officers = $officers->toArray();
        foreach ($officers as &$record) {
            unset($record["symbol"]);
            unset($record["is_foreigner"]);
            $record["position"] = $record["position"]["name"];
        }
        // set cache
        Redis::set($cacheName, $officers, Unix::hour(24));

        return ApiResponse::success($officers);
    }
}
