<?php

namespace App\Models\Mongo\Company;

use MongoDB\Laravel\Eloquent\Model;

class Position extends Model
{
    protected $connection = "mongodb";
    protected $table = "positions";

    protected $hidden = ["id"];
    public $timestamps = false;
}
