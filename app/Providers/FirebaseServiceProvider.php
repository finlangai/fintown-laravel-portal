<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Kreait\Firebase\Factory;

class FirebaseServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton("firebase.storage", function ($app) {
            $base64Credentials = env("FIREBASE_CREDENTIALS");
            $credentialsJSON = base64_decode($base64Credentials);

            $tempCredentialsFile = tempnam(sys_get_temp_dir(), "firebase");
            file_put_contents($tempCredentialsFile, $credentialsJSON);

            $factory = (new Factory())->withServiceAccount(
                $tempCredentialsFile
            );

            // clean up the temp file after used
            unlink($tempCredentialsFile);
            return $factory->createStorage();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
