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
        if (Schema::hasColumn("users", "type_id")) {
            Schema::table("users", function (Blueprint $table) {
                $table->dropColumn("type_id");
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (!Schema::hasColumn("users", "type_id")) {
            Schema::table("users", function (Blueprint $table) {
                $table->string("type_id", 3)->after("id");
            });
        }
    }
};
