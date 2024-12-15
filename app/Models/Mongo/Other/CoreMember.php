<?php

namespace App\Models\Mongo\Other;

use MongoDB\Laravel\Eloquent\Model;

class CoreMember extends Model
{
    protected $connection = "mongodb";
    protected $table = "members";

    protected $hidden = ["id"];
}
