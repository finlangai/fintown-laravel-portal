<?php
use App\Http\Controllers\API\Tickers\IndustryTickersController;
use App\Http\Controllers\API\Tickers\TickersController;
use App\Http\Controllers\API\Tickers\TopGainerTickersController;
use App\Http\Controllers\API\Tickers\TopRevenueTickersController;
use Illuminate\Support\Facades\Route;

// === TICKERS ROUTE
Route::get("tickers", TickersController::class);
Route::prefix("tickers")->group(function () {
    Route::get("total", [TickersController::class, "total"]);
    Route::get("overview", [TickersController::class, "overview"]);
    Route::get("top-gainers", TopGainerTickersController::class);
    Route::get("top-revenue", TopRevenueTickersController::class);
    Route::get("industry", IndustryTickersController::class);
});
