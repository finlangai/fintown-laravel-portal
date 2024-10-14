<?php

namespace App\Models\Mongo\System;

use MongoDB\Laravel\Eloquent\Model;

class Criteria extends Model
{
    protected $connection = "mongodb";
    protected $table = "criterias";

    public $timestamps = ["updated_at"];
    const CREATED_AT = null;
}
