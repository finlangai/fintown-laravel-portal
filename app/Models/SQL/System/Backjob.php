<?php

namespace App\Models\SQL\System;

use Illuminate\Database\Eloquent\Casts\ArrayObject;
use Illuminate\Database\Eloquent\Casts\AsArrayObject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Backjob extends Model
{
    use HasFactory;

    protected $table = "backjobs";

    protected $fillable = [
        "name",
        "description",
        "job_class",
        "is_active",
        "parameters",
        "interval",
        "cron_expression",
        "time",
        "last_run",
        "next_run",
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            "parameters" => "array",
            "last_run" => "datetime",
            "next_run" => "datetime",
        ];
    }
}
