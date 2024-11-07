<?php

use App\Models\SQL\Payment\PaymentMethod;
use App\Models\SQL\User\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("transactions", function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class, "user_id");
            $table->foreignIdFor(PaymentMethod::class, "payment_method_id");
            $table->string("info", 255)->nullable();
            $table->float("amount")->nullable();
            $table->timestamp("completion_time")->nullable();
            $table
                ->enum("status", [
                    "fulfilled",
                    "processing",
                    "declined",
                    "aborted",
                ])
                ->default("processing");
            $table->json("payload")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("transactions");
    }
};
