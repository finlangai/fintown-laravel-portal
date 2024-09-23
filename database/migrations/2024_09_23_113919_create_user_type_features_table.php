<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_type_features', function (Blueprint $table) {
            $table->id();
            $table->string('type_id', 3);
            $table->foreign('type_id')->references('id')->on('user_types')->cascadeOnDelete();

            $table->string('feature_id', 3);
            $table->foreign('feature_id')->references('id')->on('features')->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_type_features');
    }
};
