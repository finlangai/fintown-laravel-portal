<?php

use App\Http\Controllers\API\Symbols\AssessmentsController;
use App\Http\Controllers\API\Symbols\ComparisonController;
use App\Http\Controllers\API\Symbols\EventsController;
use App\Http\Controllers\API\Symbols\FinancialStatementController;
use App\Http\Controllers\API\Symbols\FluctuationController;
use App\Http\Controllers\API\Symbols\HoldersController;
use App\Http\Controllers\API\Symbols\InternalTransactionsController;
use App\Http\Controllers\API\Symbols\NewsController;
use App\Http\Controllers\API\Symbols\OfficersController;
use App\Http\Controllers\API\Symbols\ProfileController;
use App\Http\Controllers\API\Symbols\QuotesController;
use App\Http\Controllers\API\Symbols\RatioController;
use App\Http\Controllers\API\Symbols\SearchController;
use App\Http\Controllers\API\Symbols\SummaryController;
use App\Http\Controllers\API\Symbols\VN30BucketController;
use Illuminate\Support\Facades\Route;

// === SYMBOLS ROUTE
Route::prefix("symbols")->group(function () {
    // Search symbols
    Route::get("search", SearchController::class);
    // VN30
    Route::get("vn30", VN30BucketController::class);

    // COMPARISON
    Route::prefix("comparison")->group(function () {
        Route::post("/", [ComparisonController::class, "retrieve"]);
        Route::get("/search", [ComparisonController::class, "search"]);
    });

    Route::prefix("{symbol}")->group(function () {
        Route::get("profile", ProfileController::class);
        Route::get("quotes", QuotesController::class);
        Route::get("summary", SummaryController::class);
        Route::get("fluctuation", FluctuationController::class);
        Route::get("officers", OfficersController::class);
        Route::get("holders", HoldersController::class);
        Route::get("events", EventsController::class);
        Route::get("news", NewsController::class);
        Route::get("transactions", InternalTransactionsController::class);
        // Route::get("dividends", ProfileController::class);
        Route::get("ratio", RatioController::class);
        Route::get("financial-statements", FinancialStatementController::class);

        // Assessments
        Route::prefix("assessment")->group(function () {
            Route::get("overview", AssessmentsController::class);
            Route::get("criteria", [AssessmentsController::class, "criteria"]);
        });
    });
});
