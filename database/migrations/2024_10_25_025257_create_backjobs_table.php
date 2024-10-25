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
        Schema::create("backjobs", function (Blueprint $table) {
            $table->id();
            $table->string("name", 128);
            $table->string("description", 256)->nullable();
            $table->boolean("is_active")->default(false);
            $table->json("parameters")->nullable();
            $table->string("job_class");
            $table->unsignedInteger("interval")->default(1);
            $table
                ->enum("interval_type", [
                    "minutely",
                    "hourly",
                    "daily",
                    "weekly",
                    "monthly",
                ])
                ->default("daily");
            $table->time("time")->default("00:00");
            $table->dateTime("last_run")->nullable();
            $table->dateTime("next_run")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("backjobs");
    }
};
