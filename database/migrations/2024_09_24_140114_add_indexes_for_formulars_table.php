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
        Schema::table('formular_library', function (Blueprint $collection) {
            if (!$collection->hasIndex("unique_identifier_idx")) {
                $collection->unique('identifier', "unique_identifier_idx");
            }
            if (!$collection->hasIndex([ 'metadata.order' => 1 ])) {
                $collection->index([ 'metadata.order' => 1 ]);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('formular_library', function (Blueprint $collection) {
            if (!$collection->hasIndex("unique_identifier_idx")) {
                $collection->dropIndex("unique_identifier_idx");
            }
            $collection->dropIndex([ 'metadata.order' => 1 ]);
        });
    }
};
