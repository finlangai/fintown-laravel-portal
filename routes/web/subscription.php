<?php

use App\Http\Controllers\SubscriptionProgramController;
use Illuminate\Support\Facades\Route;

Route::prefix("subscription")
    ->name("subscription.")
    ->group(function () {
        Route::resource("programs", SubscriptionProgramController::class);
    });
