<?php

namespace App\Models\Mongo\System;

use MongoDB\Laravel\Eloquent\Model;

class Criteria extends Model
{
    const COLLECTION_NAME = "criterias";
    protected $connection = "mongodb";
    protected $table = self::COLLECTION_NAME;

    protected $fillable = ["name", "slug", "group"];

    protected $cast = ["id" => "int"];
    public $timestamps = ["updated_at"];
    const CREATED_AT = null;
}
