<?php

use App\Http\Controllers\Payment\PaymentController;
use Illuminate\Support\Facades\Route;

Route::prefix("payment")->group(function () {
    Route::post("initiate", [
        PaymentController::class,
        "initiateSubscriptionRegistration",
    ]);

    Route::post("check-promotion", [
        PaymentController::class,
        "checkPromotionCode",
    ]);
});
