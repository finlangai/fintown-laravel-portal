<?php

namespace App\Models\Mongo;

use MongoDB\Laravel\Eloquent\Model;

class Formular extends Model
{
    protected $connection = "mongodb";
    protected $table = "formular_library";

    protected $hidden = ["id"];
    public $timestamps = false;

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return "identifier";
    }
}
