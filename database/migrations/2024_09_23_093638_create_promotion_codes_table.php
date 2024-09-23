<?php

use App\Models\SQL\Subcription\Program;
use App\Models\SQL\User\User;
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
        Schema::create('promotion_codes', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class, 'partner_id');
            $table->string('program_id', 5);
            $table->string('code', 64);
            $table->integer('use_limit')->nullable();
            $table->float('discount')->default(0);
            $table->float('commission_rate')->default(0);
            $table->timestamp('start_date')->nullable();
            $table->timestamp('expired_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotion_codes');
    }
};
