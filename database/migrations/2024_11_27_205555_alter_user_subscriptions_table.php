<?php

use App\Models\SQL\Payment\Transaction;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table("user_subscriptions", function (Blueprint $table) {
            $table->dropColumn("transaction_id");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table("user_subscriptions", function (Blueprint $table) {
            $table
                ->foreignIdFor(Transaction::class, "transaction_id")
                ->after("program_id");
        });
    }
};
