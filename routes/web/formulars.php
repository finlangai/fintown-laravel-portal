<?php

use App\Http\Controllers\TechnicalIndicatorController;
use Illuminate\Support\Facades\Route;

// formulars
Route::prefix("formulars")
    ->name("formulars.")
    ->group(function () {
        // technical-indicators
        Route::prefix("technical-indicators")
            ->name("technical-indicators.")
            ->group(function () {
                Route::get("/", [
                    TechnicalIndicatorController::class,
                    "index",
                ])->name("index");

                Route::post("update/order", [
                    TechnicalIndicatorController::class,
                    "editOrder",
                ])->name("edit-order");

                Route::post("updateName/Recipe", [
                    TechnicalIndicatorController::class,
                    "editNameRecipe",
                ])->name("editNameRecipe");

                Route::post("update/metadata", [
                    TechnicalIndicatorController::class,
                    "metadata",
                ])->name("metadata");

                Route::post("updateRecipe/orverview", [
                    TechnicalIndicatorController::class,
                    "updateRecipeOverview",
                ])->name("updateRecipeOrverview");
            });
    });
