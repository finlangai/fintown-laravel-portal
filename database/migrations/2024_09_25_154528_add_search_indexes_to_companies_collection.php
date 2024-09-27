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
            if (!$collection->hasIndex('compound_text_indexes_on_symbol_and_company_name')) {
                $collection->index([ 'symbol' => "text", 'company_name' => "text" ],
                    'compound_text_indexes_on_symbol_and_company_name'
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
            $collection->dropIndex(index: "compound_text_indexes_on_symbol_and_company_name");
        });
    }
};
