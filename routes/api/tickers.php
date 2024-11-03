<?php

use App\Http\Controllers\API\Tickers\BestTickerController;
use App\Http\Controllers\API\Tickers\IndustryTickersController;
use App\Http\Controllers\API\Tickers\TechnicalChartController;
use App\Http\Controllers\API\Tickers\TickersController;
use App\Http\Controllers\API\Tickers\TopGainerTickersController;
use App\Http\Controllers\API\Tickers\TopRevenueTickersController;
use Illuminate\Support\Facades\Route;

// === TICKERS ROUTE
Route::get("tickers", TickersController::class);
Route::prefix("tickers")->group(function () {
    Route::get("total", [TickersController::class, "total"]);
    Route::get("overview", [TickersController::class, "overview"]);
    Route::get("best", BestTickerController::class);

    Route::get("top-gainers", TopGainerTickersController::class);
    Route::get("top-revenue", TopRevenueTickersController::class);
    Route::get("industry", IndustryTickersController::class);

    Route::prefix("technical-chart")->group(function () {
        Route::get("overview", [TechnicalChartController::class, "overview"]);
        Route::get("stocks", [TechnicalChartController::class, "stocks"]);
    });
});
