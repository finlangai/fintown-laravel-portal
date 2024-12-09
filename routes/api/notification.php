<?php

use App\Http\Controllers\API\General\NotificationController;
use Illuminate\Support\Facades\Route;

Route::get("notification", [NotificationController::class, "index"]);
Route::get("notification/generate-token", [
    NotificationController::class,
    "tokenGenerate",
]);
Route::post("notification/mark-as-read", [
    NotificationController::class,
    "markAsRead",
]);
