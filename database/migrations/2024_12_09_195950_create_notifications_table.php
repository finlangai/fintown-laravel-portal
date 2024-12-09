<?php

use App\Models\SQL\System\Notification;
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
        if (!Schema::hasTable("notifications")) {
            Schema::create("notifications", function (Blueprint $table) {
                $table->uuid("id")->primary();
                $table->string("title");
                $table->string("content")->nullable();
                $table->string("thumbnail")->nullable();
                $table->string("hyperlink")->nullable();
                $table->timestamp("created_at")->useCurrent();
            });
        }

        if (!Schema::hasTable("notification_readed")) {
            Schema::create("notification_readed", function (Blueprint $table) {
                $table->foreignIdFor(Notification::class);
                $table->foreignIdFor(User::class);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("notifications");
        Schema::dropIfExists("notification_readed");
    }
};
