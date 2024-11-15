<?php

namespace App\Models\Mongo\Company;

use MongoDB\Laravel\Eloquent\Model;

class Dividend extends Model
{
    protected $connection = "mongodb";
    protected $table = "dividends";

    protected $hidden = ["id"];
    public $timestamps = false;

    protected $casts = ["registration_date" => "datetime"];
}
