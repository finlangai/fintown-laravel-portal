<?php

use App\Http\Controllers\API\CompanyController;
use App\Http\Controllers\CompanyEditController;
use App\Http\Controllers\CompanyWebController;
use App\Http\Controllers\FinancialController;
use App\Http\Controllers\HolderWebController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StaffWebController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('Login'),
        'canRegister'    => Route::has('Register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
     ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})
->middleware([ 'auth', 'verified' ])
->name('dashboard');



Route::middleware('auth')->group(function () {
    // company 
    Route::get('/company',  [CompanyWebController::class, 'index'])->name('companies.index');
    Route::get('/companies/{symbol}/edit',  [CompanyWebController::class, 'edit'])->name('companies.edit');
    Route::put('/companies/update/{symbol}', [CompanyWebController::class, 'update'])->name('companies.update');
    Route::put('/holders/update/{id}', [HolderWebController::class, 'update'])->name('holders.update');
    Route::delete('/holders/delete/{id}', [HolderWebController::class, 'destroy'])->name('holders.delete');


    // financial
    Route::get('/financial', [FinancialController::class, 'index']);
    

    // staff và các trang liên quan đến Staff
    Route::get('/staff',  [StaffWebController::class, 'index'])->name('staff.index'); 
    


    Route::get('/profile', [ ProfileController::class, 'edit' ])->name('profile.edit');
    Route::patch('/profile', [ ProfileController::class, 'update' ])->name('profile.update');
    Route::delete('/profile', [ ProfileController::class, 'destroy' ])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
