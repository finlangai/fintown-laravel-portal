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
            $table->dropColumn("is_active");
            $table->dropColumn("renewal_date");
            $table->dropColumn("payment_date");
            $table->dropColumn("total_payment");
            $table
                ->foreignIdFor(Transaction::class, "transaction_id")
                ->after("program_id");
            $table
                ->enum("status", ["imminent", "active", "expired", "cancelled"])
                ->after("transaction_id")
                ->default("imminent");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table("user_subscriptions", function (Blueprint $table) {
            $table->dropColumn("status");
            $table->dropForeign(["transaction_id"]);
            $table->dropColumn("transaction_id");
            $table->boolean("is_active")->after("program_id");
            $table->date("renewal_date")->after("is_active");
            $table->date("payment_date")->after("renewal_date");
            $table->float("total_payment")->after("payment_date");
        });
    }
};
