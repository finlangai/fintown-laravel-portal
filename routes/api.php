<?php

use Illuminate\Support\Facades\Route;

Route::middleware([])->group(function () {
    require __DIR__ . "/api/auth.php";
    require __DIR__ . "/api/tickers.php";
    require __DIR__ . "/api/symbols.php";
});
