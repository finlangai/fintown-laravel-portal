
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
    require __DIR__ . "/web/assessments.php";
    require __DIR__ . "/web/company.php";
    require __DIR__ . "/web/formulars.php";
    require __DIR__ . "/web/profile.php";
    require __DIR__ . "/web/staff.php";
    require __DIR__ . "/web/subscription.php";
    require __DIR__ . "/web/system.php";
    require __DIR__ . "/web/user.php";
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
        "hyperlink" => "/dashboard/co-phieu/$symbol/ket-qua-du-bao",
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

