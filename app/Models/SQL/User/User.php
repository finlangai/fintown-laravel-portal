<?php

namespace App\Models\SQL\User;

use App\Models\SQL\Subcription\CommissionHistory;
use App\Models\SQL\Subcription\PromotionCode;
use App\Models\SQL\Subcription\Subcription;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use MongoDB\Laravel\Relations\HasMany;
use MongoDB\Laravel\Relations\HasOne;

class User extends Authenticatable
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'fullname',
        'email',
        'phone',
        'password',
     ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
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
            'password' => 'hashed',
         ];
    }

    public function watchlists(): HasMany
    {
        return $this->hasMany(Watchlist::class, 'user_id');
    }

    public function subcriptions(): HasMany
    {
        return $this->hasMany(Subcription::class, 'user_id');
    }

    public function promotionCodes(): HasMany
    {
        return $this->hasMany(PromotionCode::class, 'partner_id');
    }

    public function commissionHistory(): HasOne
    {
        return $this->hasOne(CommissionHistory::class, 'user_id');
    }
}
