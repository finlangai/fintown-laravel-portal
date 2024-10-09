<?php
use App\Http\Controllers\API\Auth\AuthController;
use Illuminate\Support\Facades\Route;

// AUTH ROUTE
Route::prefix("auth")
    ->middleware("auth:api")
    ->group(function () {
        // Bypass API Guard
        Route::withoutMiddleware("auth:api")->group(function () {
            Route::post("login", [AuthController::class, "login"]);
            Route::post("register", [AuthController::class, "register"]);
        });

        Route::get("refresh", [AuthController::class, "refresh"]);
        Route::get("profile", [AuthController::class, "profile"]);
        Route::get("logout", [AuthController::class, "logout"]);
    });
