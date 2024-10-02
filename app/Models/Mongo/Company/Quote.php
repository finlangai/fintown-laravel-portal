<?php

namespace App\Models\Mongo\Company;

use MongoDB\Laravel\Eloquent\Model;

class Quote extends Model
{
    protected $connection = "mongodb";
    protected $table = "stock_quotes";

    protected $hidden = ["id", "interval", "symbol"];
    public $timestamps = false;
}
