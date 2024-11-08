<?php

namespace App\Models\SQL\Staff;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\SQL\RBAC\Permission;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use MongoDB\Laravel\Relations\BelongsToMany;
use Spatie\Permission\Traits\HasRoles;

class Staff extends Authenticatable
{
    use HasFactory;
    use HasRoles;

    protected $table = "staffs";

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ["username", "fullname", "email", "password"];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        "password",
        // 'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            // 'email_verified_at' => 'datetime',
            "password" => "hashed",
        ];
    }
    public function roles()
    {
        return $this->belongsToMany(
            "Spatie\Permission\Models\Role",
            "model_has_roles",
            "model_id",
            "role_id"
        )->where("model_type", self::class);
    }
    public function permissions()
    {
        return $this->belongsToMany(
            Permission::class,
            "model_has_permissions",
            "model_id",
            "permission_id"
        )->where("model_type", self::class);
    }
}
