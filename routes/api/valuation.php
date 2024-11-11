<?php

use App\Http\Controllers\Valuation\ScenariosController;
use App\Http\Controllers\Valuation\ValuationController;
use Illuminate\Support\Facades\Route;

Route::prefix("valuation/{formularInfo}/{stash}")->group(function () {
    Route::get("params", [ValuationController::class, "params"]);
    Route::post("calculate", [ValuationController::class, "calculate"]);

    Route::apiResource("scenarios", ScenariosController::class);
});
