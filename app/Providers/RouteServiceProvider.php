<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Route::bind('company', function ($value) {
        //     return Company::where('symbol', strtoupper($value))->firstOrFail();
        // });
    }
}
