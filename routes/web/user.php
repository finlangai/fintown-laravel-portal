<?php

use App\Http\Controllers\Web\User\UserController;
use App\Http\Controllers\Web\User\UserRolesController;
use Illuminate\Support\Facades\Route;

Route::resource("users", UserController::class)->only(
    "index",
    "store",
    "update",
    "destroy"
);

Route::prefix("users")
    ->name("users.")
    ->group(function () {
        Route::patch("change-password/{user}", [
            UserController::class,
            "updatePassword",
        ])->name("update.password");

        Route::patch("cancel-subscription/{subscriptionId}", [
            UserController::class,
            "cancelSubscription",
        ])->name("cancel-subscription");

        // === USER ROLES ROUTES
        Route::prefix("roles")
            ->name("roles.")
            ->group(function () {
                Route::get("/", UserRolesController::class)->name("index");
                Route::post("/create", [
                    UserRolesController::class,
                    "store",
                ])->name("store");
                Route::post("/update/{role}", [
                    UserRolesController::class,
                    "update",
                ])->name("update");
                Route::delete("/delete/{role}", [
                    UserRolesController::class,
                    "destroy",
                ])->name("destroy");
            });
    });
