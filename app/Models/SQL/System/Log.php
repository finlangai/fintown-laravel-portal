<?php

namespace App\Models\SQL\System;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;
    protected $table = 'system_logs';
    const UPDATED_AT = null;

}
