<?php

use App\Http\Controllers\API\General\FaqController;
use App\Http\Controllers\API\General\MemberController;
use App\Http\Controllers\API\General\PricingController;
use Illuminate\Support\Facades\Route;

Route::middleware([])->group(function () {
    require __DIR__ . "/api/auth.php";

    require __DIR__ . "/api/tickers.php";
    require __DIR__ . "/api/symbols.php";

    Route::prefix("general")->group(function () {
        require __DIR__ . "/api/pricing.php";
        Route::get("faq", FaqController::class);
        Route::get("members", MemberController::class);

        Route::middleware(["auth:api"])->group(function () {
            require __DIR__ . "/api/payment.php";

            require __DIR__ . "/api/user.php";
            require __DIR__ . "/api/watchlist.php";
            require __DIR__ . "/api/notification.php";
        });
    });

    Route::middleware(["auth:api"])->group(function () {
        require __DIR__ . "/api/valuation.php";
    });
});
