<?php

use App\Http\Controllers\Payment\PaymentController;
use Illuminate\Support\Facades\Route;

// PAYMENT IS STILL IN DEVELOPMENT
Route::prefix("payment")
    ->name("payment.")
    ->group(function () {
        Route::get("verify/{provider}", [
            PaymentController::class,
            "verify",
        ])->name("verify");
        Route::get("test", [PaymentController::class, "test"])->name("test");
    });
