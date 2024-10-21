<?php

namespace App\Models\Mongo\Company;

use MongoDB\Laravel\Eloquent\Model;

class Assessment extends Model
{
    protected $connection = "mongodb";
    protected $table = "assessments";
    protected $hidden = ["id"];

    public $timestamps = ["updated_at"];
    const CREATED_AT = null;

    public function company()
    {
        return $this->belongsTo(Company::class, "symbol", "symbol");
    }
}
