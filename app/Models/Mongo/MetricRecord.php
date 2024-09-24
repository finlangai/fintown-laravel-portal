<?php

namespace App\Models\Mongo;

use Illuminate\Database\Eloquent\Model;

class MetricRecord extends Model
{
    protected $connection = 'mongodb';
    protected $table      = 'metric_records';

    protected $hidden  = [ 'id' ];
    public $timestamps = false;

}
