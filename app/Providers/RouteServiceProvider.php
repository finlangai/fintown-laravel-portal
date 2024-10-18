<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

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
        Inertia::share([
            'userPermissionsAndRoles' => function () {
                /** @var \App\Models\User|null $user */
                $user = Auth::user();
                if ($user) {
                    $permissions = $user->getAllPermissions()->pluck('name');

                    $roles = $user->getRoleNames(); 
                    $isAdmin = $roles->contains('admin');
                    $isSuperAdmin = $roles->contains('super-admin');
        
                    return [
                        'roles' => $roles,            
                        'permissions' => $permissions, 
                        'isAdmin' => $isAdmin,        
                        'isSuperAdmin' => $isSuperAdmin, 
                    ];
                }
                return [
                    'roles' => [],             
                    'permissions' => [],      
                    'isAdmin' => false,       
                    'isSuperAdmin' => false,   
                ];
            },
        ]);
        
        // Route::bind('company', function ($value) {
        //     return Company::where('symbol', strtoupper($value))->firstOrFail();
        // });
    }
}
