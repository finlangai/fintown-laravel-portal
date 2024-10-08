<?php

namespace App\Models\Mongo\Company;

use MongoDB\Laravel\Eloquent\Model;

class News extends Model
{
    protected $connection = "mongodb";
    protected $table = "news";

    protected $hidden = ["id"];
    public $timestamps = false;
}
