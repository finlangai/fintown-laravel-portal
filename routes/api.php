<?php

use App\Http\Controllers\API\CompanyController;
use App\Http\Controllers\API\FinancialStatementController;
use App\Http\Controllers\API\RatioController;
use App\Http\Controllers\API\SymbolSearchController;
use Illuminate\Support\Facades\Route;

Route::apiResource('companies', CompanyController::class)
    ->only([ 'index' ]);

Route::prefix('symbols')->group(function () {
    Route::get('search', SymbolSearchController::class);

    Route::prefix('{company}')->group(function () {
        Route::get('financial-statements', [ FinancialStatementController::class, 'show' ]);
        Route::get('ratio', [ RatioController::class, 'show' ]);
    });
});
