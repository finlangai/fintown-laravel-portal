<?php

use App\Http\Controllers\Web\System\BackjobController;
use App\Http\Controllers\Web\System\CriteriaController;
use Illuminate\Support\Facades\Route;

Route::prefix("system")
    ->name("system.")
    ->group(function () {
        Route::resource("backjobs", BackjobController::class)->except(
            "show",
            "edit",
            "create"
        );
        Route::resource("criterias", CriteriaController::class)->except(
            "show",
            "edit",
            "create"
        );
        // Route::get("formulars", [SystemController::class, "formulars"]);
    });
