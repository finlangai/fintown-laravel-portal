<?php

use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\FinancialStatementController;
use App\Http\Controllers\API\RatioController;
use App\Http\Controllers\API\SymbolSearchController;
use App\Http\Controllers\API\VN30StockController;
use Illuminate\Support\Facades\Route;

// AUTH ROUTE
Route::prefix('auth')->middleware('auth:api')->group(function () {
    // Bypass API Guard
    Route::withoutMiddleware('auth:api')->group(function () {
        Route::post('login', [ AuthController::class, 'login' ]);
        Route::post('register', [ AuthController::class, 'register' ]);
    });

    Route::get('refresh', [ AuthController::class, 'refresh' ]);
    Route::get('profile', [ AuthController::class, 'profile' ]);
    Route::get('logout', [ AuthController::class, 'logout' ]);
});

// === SYMBOLS ROUTE
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
