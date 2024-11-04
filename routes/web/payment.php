<?php

use App\Http\Controllers\Payment\PaymentController;
use Illuminate\Support\Facades\Route;

// PAYMENT IS STILL IN DEVELOPMENT
Route::prefix("payment")
    ->name("payment.")
    ->group(function () {
        Route::post("vnpay", [PaymentController::class, "vnpay"])->name(
            "vnpay"
        );
        Route::post("momo", [PaymentController::class, "momo"])->name("momo");
        Route::get("info", [PaymentController::class, "info"])->name("info");
    });
