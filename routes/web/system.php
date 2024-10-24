<?php

use App\Http\Controllers\Web\SystemController;
use Illuminate\Support\Facades\Route;

Route::prefix("system")->group(function () {
    Route::get("backjobs", [SystemController::class, "backjobs"]);
    // Route::get("formulars", [SystemController::class, "formulars"]);
});
