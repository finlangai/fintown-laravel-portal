<?php

namespace App\Models\SQL\Subcription;

use App\Models\SQL\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsTo;
use MongoDB\Laravel\Relations\HasMany;

class PromotionCode extends Model
{
    use HasFactory;

    public function partner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'partner_id');
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class, 'program_id');
    }

    /**
     * One to Many relation ship between promotion_codes and commission_histories
     *
     * @return HasMany
     */
    public function histories(): HasMany
    {
        return $this->hasMany(CommissionHistory::class, 'promotion_id');
    }
}
