<?php

namespace App\Models\SQL\System;

use App\Models\SQL\User\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasUuids;
    const UPDATED_AT = null;

    protected $fillable = ["title", "content", "thumbnail", "hyperlink"];

    public function readByUsers()
    {
        return $this->hasMany(NotificationReaded::class);
    }
}
