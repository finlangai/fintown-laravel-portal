<?php

namespace App\Models\SQL\System;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Backjob extends Model
{
    use HasFactory;

    protected $table = "backjobs";
    protected $fillable = [
        "name",
        "description",
        "is_active",
        "parameters",
        "interval",
        "interval_type",
        "time",
    ];

    protected $casts = [
        "parameters" => "object",
        "last_run" => "datetime",
        "next_run" => "datetime",
    ];
}
