<?php

namespace App\Models\SQL\System;

use Illuminate\Database\Eloquent\Model;

class NotificationReaded extends Model
{
    protected $table = "notification_readed";
    public $timestamps = false;

    protected $fillable = ["notification_id", "user_id"];
}
