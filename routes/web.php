
<?php
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Models\Mongo\Company\Stash;
use Inertia\Inertia;

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
    // staffs và các trang liên quan đến staffs
    require __DIR__ . "/web/staff.php";
    require __DIR__ . "/web/user.php";
    require __DIR__ . "/web/profile.php";

    require __DIR__ . "/web/company.php";
    require __DIR__ . "/web/assessments.php";
    require __DIR__ . "/web/system.php";
    require __DIR__ . "/web/subscription.php";
});
require __DIR__ . "/web/payment.php";

require __DIR__ . "/auth.php";

