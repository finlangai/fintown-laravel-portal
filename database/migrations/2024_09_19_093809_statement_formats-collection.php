<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use MongoDB\Laravel\Schema\Blueprint;

return new class extends Migration
{
    protected $connection = 'mongodb';
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('statement_formats', function (Blueprint $collection) {
            $collection->index([ 'icb_ranges.start' => 1, 'icb_ranges.end' => 1 ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('statement_formats', function (Blueprint $collection) {
            $collection->dropIndex([ 'icb_ranges.start' => 1, 'icb_ranges.end' => 1 ]);
        });
    }
};
