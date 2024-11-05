<?php

namespace App\Models\SQL\RBAC;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsToMany;

class Role extends Model
{
    use HasFactory;

    // public function staffs(): BelongsToMany
    // {
    //     return $this->belongsToMany(Staff::class, 'staff_roles', 'role_id', 'staff_id');
    // }

    // public function permissions(): BelongsToMany
    // {
    //     return $this->belongsToMany(Permission::class, 'role_permissions', 'role_id', 'permission_id');
    // }
}
