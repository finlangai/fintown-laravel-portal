<?php

use App\Http\Controllers\TechnicalIndicatorController;
use Illuminate\Support\Facades\Route;

Route::get("/Recipe/Technical-indicators", [
    TechnicalIndicatorController::class,
    "index",
])->name("Technical-indicators.index");
Route::post("/update/order", [
    TechnicalIndicatorController::class,
    "editOrder",
])->name("editOrder");
Route::post("/updateName/Recipe", [
    TechnicalIndicatorController::class,
    "editNameRecipe",
])->name("editNameRecipe");
Route::post("/update/metadata", [
    TechnicalIndicatorController::class,
    "metadata",
])->name("is_percentage");
Route::post("/updateRecipe/orverview", [
    TechnicalIndicatorController::class,
    "updateRecipeOverview",
])->name("updateRecipeOrverview");
