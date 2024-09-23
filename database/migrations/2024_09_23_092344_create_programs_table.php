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
        Schema::create('subcription_programs', function (Blueprint $table) {
            $table->string('id', 5)->primary();
            $table->string('incharge_id', 3);
            $table->string('name', 128);
            $table->string('description', 256);
            $table->float('price');
            $table->float('discount')->default(0);
            $table->integer('duration');
            $table->enum('duration_type', [ 'day', 'month', 'year' ]);
            $table->boolean('is_renewable')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subcription_programs');
    }
};
