<?php

namespace App\Http\Controllers\API\General;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\General\WatchlistSymbolRequest;
use App\Models\Mongo\General\Watchlist;
use App\Utils\ApiResponse;

class WatchlistController extends Controller
{
    public function addToWatchlist(WatchlistSymbolRequest $request)
    {
        $symbol = $request->validated("symbol");

        // ensure that the symbol is in uppercase
        $symbol = strtoupper($symbol);

        // get the user id which is used as the document id
        $userId = auth("api")->user()->id;
        // Use raw MongoDB query to upsert and push symbol to array
        Watchlist::raw(
            fn($collection) => $collection->updateOne(
                ["_id" => $userId],
                [
                    // '$setOnInsert' => [
                    //     "symbols" => [],
                    // ],
                    '$addToSet' => ["symbols" => $symbol],
                ],
                ["upsert" => true]
            )
        );

        return ApiResponse::success();
    }

    public function removeFromWatchlist(WatchlistSymbolRequest $request)
    {
        $symbol = $request->validated("symbol");

        // ensure that the symbol is in uppercase
        $symbol = strtoupper($symbol);

        // get the user id which is used as the document id
        $userId = auth("api")->user()->id;

        // Use raw MongoDB query to pull symbol from array
        Watchlist::raw(
            fn($collection) => $collection->updateOne(
                ["_id" => $userId],
                ['$pull' => ["symbols" => $symbol]]
            )
        );

        return ApiResponse::success();
    }
}
