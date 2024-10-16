<?php

namespace App\Models\SQL\Staff;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsToMany;

class Permission extends Model
{
    use HasFactory;

    // public function roles(): BelongsToMany
    // {
    //     return $this->belongsToMany(Permission::class, 'role_permissions', 'permission_id', 'role_id');
    // }
}
