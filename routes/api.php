<?php

use App\Http\Controllers\API\CompanyController;
use Illuminate\Support\Facades\Route;

Route::apiResource('companies', CompanyController::class);
