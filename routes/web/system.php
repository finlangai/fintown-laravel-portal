<?php

use App\Http\Controllers\Web\System\BackjobController;
use Illuminate\Support\Facades\Route;

Route::prefix("system")
    ->name("system.")
    ->group(function () {
        Route::resource("backjobs", BackjobController::class)->except(
            "edit",
            "create"
        );
        // Route::get("formulars", [SystemController::class, "formulars"]);
    });
