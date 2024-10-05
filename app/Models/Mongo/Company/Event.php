<?php

namespace App\Models\Mongo\Company;

use MongoDB\Laravel\Eloquent\Model;

class Event extends Model
{
    protected $connection = "mongodb";
    protected $table = "events";

    protected $hidden = ["id"];
    public $timestamps = false;
}
