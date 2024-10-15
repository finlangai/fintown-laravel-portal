<?php

namespace App\Models\Mongo\Company;

use MongoDB\Laravel\Eloquent\Model;

class Holder extends Model
{
    protected $connection = "mongodb";
    protected $table = "holders";

    protected $hidden = ["id"];
    public $timestamps = false;
}
