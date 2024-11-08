<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StaffWebController;
use App\Http\Controllers\FinancialController;
use App\Http\Controllers\HolderWebController;
use App\Http\Controllers\StaffListController;
use App\Http\Controllers\CompanyWebController;
use App\Http\Controllers\PermissionController;

Route::get("/staff", [StaffWebController::class, "index"])->name("staff.index");

Route::get("/staff-list", [StaffListController::class, "index"])->name(
    "staffList.index"
);
Route::delete("/staffRemove/{id}", [
    StaffListController::class,
    "destroy",
])->name("staffRemove");

Route::post("/staffAdd", [StaffListController::class, "store"])->name(
    "staffAdd"
);

Route::put("/staffedit/{id}", [StaffListController::class, "update"])->name(
    "staff.update"
);

Route::post("/staff/reset-password/{id}", [
    StaffListController::class,
    "resetPassword",
])->name("staff.reset-password");

// đây là nơi để code role
Route::get("/staff/role", [RoleController::class, "index"])->name(
    "staff.index"
);
Route::post("/addRole", [RoleController::class, "store"])->name(
    "staff.role.store"
);
Route::delete("/roles/Remove/{id}", [RoleController::class, "destroy"])->name(
    "staff.role.destroy"
);
Route::put("/roles/edit/{id}", [RoleController::class, "update"])->name(
    "staff.role.update"
);
Route::put("/update/role/{RoleID}/permissions", [
    RoleController::class,
    "updateRoleHasPermission",
])->name("staff.role.update");

// đây là nơi để code pemrission
Route::get("/staff/permission", [PermissionController::class, "index"])->name(
    "permission.index"
);
Route::post("/addPermission", [PermissionController::class, "store"])->name(
    "staff.permission.store"
);
Route::delete("/Permission/Remove/{id}", [
    PermissionController::class,
    "destroy",
])->name("staff.permission.destroy");
Route::put("/Permission/edit/{id}", [
    PermissionController::class,
    "update",
])->name("staff.permission.update");
// đây là nơi để code
Route::post("/staff/reset-password/{id}", [
    StaffListController::class,
    "resetPassword",
])->name("staff.reset-password");

Route::put("/staff/update-permissions/{StaffID}", [
    StaffWebController::class,
    "updatePermissions",
])->name("staff.updatePermissions");
