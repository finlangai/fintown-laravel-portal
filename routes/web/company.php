<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HolderWebController;
use App\Http\Controllers\CompanyWebController;
use App\Http\Controllers\FinancialController;

Route::get("/company", [CompanyWebController::class, "index"])->name(
    "companies.index"
);
Route::get("/companies/{symbol}/edit", [
    CompanyWebController::class,
    "edit",
])->name("companies.edit");

Route::put("/companies/update/{symbol}", [
    CompanyWebController::class,
    "update",
])->name("companies.update");

Route::put("/holders/update/{id}", [
    HolderWebController::class,
    "update",
])->name("holders.update");

Route::delete("/holders/delete/{id}", [
    HolderWebController::class,
    "destroy",
])->name("holders.delete");

// financial
Route::get("/financial", [FinancialController::class, "index"]);
