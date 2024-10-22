<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web;

Route::resource("assessments", Web\AssessmentController::class)->only([
    "index",
    "show",
    "destroy",
]);
