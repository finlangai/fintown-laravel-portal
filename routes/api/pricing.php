<?php

use App\Http\Controllers\API\General\PricingController;
use Illuminate\Support\Facades\Route;

Route::prefix("pricing")->group(function () {
    Route::get("/", PricingController::class);
    Route::get("/program/{programId}", [PricingController::class, "program"]);
});
