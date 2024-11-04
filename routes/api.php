<?php

use Illuminate\Support\Facades\Route;

Route::middleware([])->group(function () {
    require __DIR__ . "/api/auth.php";

    require __DIR__ . "/api/tickers.php";
    require __DIR__ . "/api/symbols.php";

    Route::prefix("general")
        ->middleware(["auth:api"])
        ->group(function () {
            require __DIR__ . "/api/user.php";
            require __DIR__ . "/api/watchlist.php";
        });
});
