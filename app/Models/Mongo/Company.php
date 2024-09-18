<?php

namespace App\Models\Mongo;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'company';
}
