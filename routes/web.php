<?php

use App\Http\Controllers\FinancialController;
use App\Http\Controllers\ProfileController;
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
    return Inertia::render('dashboard');
})
// ->middleware([ 'auth', 'verified' ])
->name('dashboard');



Route::get('/financial',  [FinancialController::class, 'index']);



Route::get('/profile', [ ProfileController::class, 'edit' ])->name('profile.edit');
Route::patch('/profile', [ ProfileController::class, 'update' ])->name('profile.update');
Route::delete('/profile', [ ProfileController::class, 'destroy' ])->name('profile.destroy');
Route::middleware('auth')->group(function () {
});

require __DIR__ . '/auth.php';
