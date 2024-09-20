<?php

namespace App\Models\Mongo;

use MongoDB\Laravel\Eloquent\Model;

class Company extends Model
{
    protected $connection = 'mongodb';
    protected $table      = 'companies';

    protected $hidden  = [ 'id' ];
    public $timestamps = false;

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'symbol';
    }
}
