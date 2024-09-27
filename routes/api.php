<?php

use App\Http\Controllers\API\CompanyController;
use App\Http\Controllers\API\FinancialStatementController;
use App\Http\Controllers\API\RatioController;
use App\Http\Controllers\API\SymbolSearchController;
use App\Http\Controllers\API\VN30StockController;
use Illuminate\Support\Facades\Route;

Route::apiResource('companies', CompanyController::class)
    ->only([ 'index' ]);

Route::prefix('symbols')->group(function () {
    // Search symbols
    Route::get('search', SymbolSearchController::class);
    
    // VN30
    Route::get('vn30', VN30StockController::class);

    Route::prefix('{company}')->group(function () {
        Route::get('financial-statements', [ FinancialStatementController::class, 'show' ]);
        Route::get('ratio', [ RatioController::class, 'show' ]);
    });
});
