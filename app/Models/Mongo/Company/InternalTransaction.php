<?php

namespace App\Models\Mongo\Company;

use MongoDB\Laravel\Eloquent\Model;

class InternalTransaction extends Model
{
    protected $connection = "mongodb";
    protected $table = "internal_transactions";

    protected $hidden = ["id"];
    public $timestamps = false;
}
