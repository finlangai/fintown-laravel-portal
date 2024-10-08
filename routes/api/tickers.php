<?php
use App\Http\Controllers\API\Tickers\IndustryTickersController;
use App\Http\Controllers\API\Tickers\TickersController;
use App\Http\Controllers\API\Tickers\TopGainerTickersController;
use Illuminate\Support\Facades\Route;

// === TICKERS ROUTE
Route::get("tickers", TickersController::class);
Route::prefix("tickers")->group(function () {
    //top-gainers
    Route::get("top-gainers", TopGainerTickersController::class);
    //industry
    Route::get("industry", IndustryTickersController::class);
});
