<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::rename("subcription_programs", "subscription_programs");
        Schema::rename("subcriptions", "user_subscriptions");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename("subscription_programs", "subcription_programs");
        Schema::rename("user_subscriptions", "subcriptions");
    }
};
