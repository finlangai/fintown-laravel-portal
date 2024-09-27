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
        Schema::table('companies', function (Blueprint $collection) {
            if (!$collection->hasIndex('company_market_cap_index')) {
                $collection->index([ 'profile.market_cap' => -1 ],
                    'company_market_cap_index'
                );
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('companies', function (Blueprint $collection) {
            $collection->dropIndex(index: "company_market_cap_index");
        });
    }
};
