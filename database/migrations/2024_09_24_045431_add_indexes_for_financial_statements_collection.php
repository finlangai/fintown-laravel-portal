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
        Schema::table('financial_statements', function (Blueprint $collection) {
            if (!$collection->hasIndex([ 'symbol' => 1, 'quarter' => 1 ])) {
                $collection->index([ 'symbol' => 1, 'quarter' => 1 ]);
            }
            if (!$collection->hasIndex([ 'year' => -1 ])) {
                $collection->index([ 'year' => -1 ]);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('financial_statements', function (Blueprint $collection) {
            $collection->dropIndex(index: [ 'symbol' => 1, 'quarter' => 1 ]);
            $collection->dropIndex(index: [ 'year' => -1 ]);
        });
    }
};
