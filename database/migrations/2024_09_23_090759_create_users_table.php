<?php

use App\Models\SQL\User\Type;
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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Type::class, 'type_id');
            $table->string('username', 128);
            $table->string('fullname', 128);
            $table->string('email', 256)->unique();
            $table->string('phone', 11);
            $table->string('password');
            $table->boolean('is_banned');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
