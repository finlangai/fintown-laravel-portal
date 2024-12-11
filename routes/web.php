
<?php
use Ably\AblyRest;
use App\Models\Mongo\Company\Company;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Models\Mongo\Company\Stash;
use App\Models\SQL\System\Notification as SystemNotification;
use App\Utils\ApiResponse;
use App\Utils\Notification;
use Inertia\Inertia;
use MongoDB\Collection;

Route::get("/dashboard", function () {
    /** @var \App\Models\User|null $user */
    $user = Auth::user();
    $isSuperAdmin = $user && $user->hasRole("super-admin");
    $Stash = Stash::all();
    // dd($Stash);
    return Inertia::render("Dashboard", [
        "isSuperAdmin" => $isSuperAdmin,
        "Stash" => $Stash,
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

    // CRUD công thức chỉ số kĩ thuật
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

    Route::get("/staff", [StaffWebController::class, "index"])->name(
        "staff.index"
    );

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
    Route::delete("/roles/Remove/{id}", [
        RoleController::class,
        "destroy",
    ])->name("staff.role.destroy");
    Route::put("/roles/edit/{id}", [RoleController::class, "update"])->name(
        "staff.role.update"
    );
    Route::put("/update/role/{RoleID}/permissions", [
        RoleController::class,
        "updateRoleHasPermission",
    ])->name("staff.role.update");

    // đây là nơi để code pemrission
    Route::get("/staff/permission", [
        PermissionController::class,
        "index",
    ])->name("permission.index");
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
    require __DIR__ . "/web/subscription.php";
});

require __DIR__ . "/web/payment.php";
require __DIR__ . "/auth.php";

Route::get("broadcast/trigger", function () {
    $company = Company::raw(
        fn(Collection $collection) => $collection->aggregate([
            ['$sample' => ["size" => 1]],
        ])
    )[0];

    $symbol = $company->symbol;
    $logo = $company->logo;

    $notification = SystemNotification::create([
        "title" => $symbol,
        "content" => "Đã có kết quả dự báo mới",
        "thumbnail" => $logo,
        "hyperlink" => '/dashboard/co-phieu/$symbol/ket-qua-du-bao',
    ]);

    Notification::send(
        $notification->id,
        $symbol,
        "Đã có kết quả dự báo mới",
        $logo,
        "/dashboard/co-phieu/$symbol/ket-qua-du-bao"
    );

    return ApiResponse::success([
        "message" => "Đã gửi thông báo với mã $symbol.",
    ]);
});

