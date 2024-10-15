<?php

namespace App\Models\Mongo\Company;

use MongoDB\Laravel\Eloquent\Model;

class Officer extends Model
{
    protected $connection = "mongodb";
    protected $table = "officers";

    protected $hidden = ["id", "position_id"];
    public $timestamps = false;

    public function position()
    {
        return $this->belongsTo(Position::class, "position_id", "id");
    }
}
