<?php

namespace App\Models\Mongo\System;

use MongoDB\Laravel\Eloquent\Model;

class Criteria extends Model
{
    protected $connection = "mongodb";
    protected $table = "criterias";

    protected $fillable = ["name", "slug", "group"];

    protected $cast = ["id" => "int"];
    public $timestamps = ["updated_at"];
    const CREATED_AT = null;
}
