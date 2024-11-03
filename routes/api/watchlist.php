<?php

use App\Http\Controllers\API\General\WatchlistController;
use Illuminate\Support\Facades\Route;

Route::prefix("watchlist")->group(function () {
    Route::post("add", [WatchlistController::class, "addToWatchlist"]);
    Route::post("remove", [WatchlistController::class, "removeFromWatchlist"]);
});
