<?php

use App\Http\Controllers\CompanyWebController;
use App\Http\Controllers\FinancialController;
use App\Http\Controllers\HolderWebController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StaffWebController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web;
use Inertia\Inertia;

// Route::get("/", function () {
//     return Inertia::render("Welcome", [
//         "canLogin" => Route::has("Login"),
//         "canRegister" => Route::has("Register"),
//         "laravelVersion" => Application::VERSION,
//         "phpVersion" => PHP_VERSION,
//     ]);
// });

Route::get("/dashboard", function () {
    /** @var \App\Models\User|null $user */
    $user = Auth::user();
    $isSuperAdmin = $user && $user->hasRole("super-admin");
    return Inertia::render("Dashboard", [
        "isSuperAdmin" => $isSuperAdmin,
    ]);
})
    ->middleware(["auth", "verified"])
    ->name("dashboard");

Route::middleware("auth")->group(function () {
    // company
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

    // staff và các trang liên quan đến Staff

    Route::get("/staff", [StaffWebController::class, "index"])->name(
        "staff.index"
    );
    Route::put("/staff/update-permissions/{StaffID}", [
        StaffWebController::class,
        "updatePermissions",
    ])->name("staff.updatePermissions");

    Route::get("/profile", [ProfileController::class, "edit"])->name(
        "profile.edit"
    );
    Route::patch("/profile", [ProfileController::class, "update"])->name(
        "profile.update"
    );
    Route::delete("/profile", [ProfileController::class, "destroy"])->name(
        "profile.destroy"
    );

    Route::resource("assessments", Web\AssessmentController::class)->only([
        "index",
        "show",
        "destroy",
    ]);
});

require __DIR__ . "/auth.php";
