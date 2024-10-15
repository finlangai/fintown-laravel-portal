<?php

namespace App\Models\Mongo\System;

use App\Models\Mongo\Formular;
use App\Models\Mongo\MetricRecord;
use MongoDB\Laravel\Eloquent\Model;

class Criteria extends Model
{
    protected $connection = "mongodb";
    protected $table = "criterias";

    public $timestamps = ["updated_at"];
    const CREATED_AT = null;
}
