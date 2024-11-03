<?php

use App\Http\Controllers\CompanyWebController;
use App\Http\Controllers\FinancialController;
use App\Http\Controllers\HolderWebController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StaffListController;
use App\Http\Controllers\StaffWebController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web;
use Inertia\Inertia;

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


    // users và các trang liên quan đến users
        








    Route::get("/staff", [StaffWebController::class, "index"])->name(
        "staff.index"
    );


    Route::get("/staff-list", [StaffListController::class, "index"])->name(
        "staffList.index"
    );
    Route::delete("/staffRemove/{id}", [StaffListController::class, "destroy"])->name("staffRemove");
    
    
    Route::post("/staffAdd", [StaffListController::class, "store"])->name("staffAdd");


    Route::put('/staffedit/{id}', [StaffListController::class, 'update'])->name('staff.update');

    Route::post('/staff/reset-password/{id}', [StaffListController::class, 'resetPassword'])->name('staff.reset-password');

    
    // đây là nơi để code role
    Route::get('/staff/role', [RoleController::class, 'index'])->name("staff.index");
    Route::post('/addRole', [RoleController::class, 'store'])->name('staff.role.store');
    Route::delete('/roles/Remove/{id}', [RoleController::class, 'destroy'])->name('staff.role.destroy');
    Route::put('/roles/edit/{id}', [RoleController::class, 'update'])->name('staff.role.update');
    Route::put('/update/role/{RoleID}/permissions', [RoleController::class, 'updateRoleHasPermission'])->name('staff.role.update');

    // đây là nơi để code pemrission 
    Route::get('/staff/permission' , [PermissionController::class, 'index'])->name('permission.index');
    Route::post('/addPermission' , [PermissionController::class, 'store'])->name('staff.permission.store');
    Route::delete('/Permission/Remove/{id}' , [PermissionController::class, 'destroy'])->name('staff.permission.destroy');
    Route::put('/Permission/edit/{id}' , [PermissionController::class, 'update'])->name('staff.permission.update');
    // đây là nơi để code 

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

    require __DIR__ . "/web/assessments.php";
    require __DIR__ . "/web/system.php";
});

require __DIR__ . "/auth.php";
