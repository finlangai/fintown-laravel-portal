<?php

namespace App\Models\Mongo\General;

use MongoDB\Laravel\Eloquent\Model;

class ValuationScenario extends Model
{
    const COLLECTION_NAME = "valuation_scenarios";

    protected $connection = "mongodb";
    protected $table = self::COLLECTION_NAME;
    protected $hidden = ["user_id"];

    protected $fillable = [
        "symbol",
        "type_id",
        "user_id",
        "title",
        "potential",
        "actual",
        "valuated",
        "expected_date",
        "note",
    ];

    protected $casts = [
        "actual" => "double",
        "potential" => "double",
        "valuated" => "double",
    ];
}
