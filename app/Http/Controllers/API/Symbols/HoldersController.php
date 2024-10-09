<?php

namespace App\Http\Controllers\API\Symbols;

use App\Utils\Redis;
use App\Utils\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\HoldersRequest;
use App\Models\Mongo\Company\Holder;
use App\Utils\Unix;

class HoldersController extends Controller
{
    public int $holdersLimit = 9;
    public int $holdersOffset = 0;
    public function __invoke(string $symbol, HoldersRequest $request)
    {
        $validated = $request->validated();
        $symbol = strtoupper($symbol);

        if (array_key_exists("limit", $validated)) {
            $this->holdersLimit = $validated["limit"];
        }

        if (array_key_exists("offset", $validated)) {
            $this->holdersOffset = $validated["offset"];
        }

        $cacheName = "symbols:$symbol:holders:$this->holdersLimit:$this->holdersOffset";
        // Check if cached
        $cache = Redis::get($cacheName);
        if ($cache) {
            return ApiResponse::success($cache);
        }

        $holders = Holder::where("symbol", $symbol)
            ->orderBy("ownership", "desc")
            ->project($this->getHolderProjection())
            ->limit($this->holdersLimit)
            ->skip($this->holdersOffset)
            ->get();

        // 404
        if (!$holders->count()) {
            return ApiResponse::notFound("Không tìm thấy dữ liệu cổ đông");
        }

        // set cache
        Redis::set($cacheName, $holders, Unix::hour(24));

        return ApiResponse::success($holders);
    }

    public function getHolderProjection(): array
    {
        return [
            "name" => 1,
            "position" => 1,
            "shares" => 1,
            "ownership" => 1,
            "isOrganization" => "\$is_organization",
            "isForeigner" => "\$is_foreigner",
            "isFounder" => "\$is_founder",
        ];
    }
}
