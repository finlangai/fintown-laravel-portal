<?php

use App\Http\Controllers\API\General\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix("user")->group(function () {
    Route::put("update", [UserController::class, "update"]);
    Route::post("change-avatar", [UserController::class, "changeAvatar"]);
});
