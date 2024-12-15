<?php

namespace App\Models\Mongo\Other;

use MongoDB\Laravel\Eloquent\Model;

class Faq extends Model
{
    protected $connection = "mongodb";
    protected $table = "faq";
}
