<?php

namespace App\Models\Mongo\Company;

use MongoDB\Laravel\Eloquent\Model;

class Stash extends Model
{
    protected $connection = "mongodb";
    protected $table = "stash";

    protected $hidden = ["id", "is_stock"];
    public $timestamps = false;

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return "symbol";
    }
}
