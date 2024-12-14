<?php

namespace App\Models\SQL\Subcription;

use App\Models\SQL\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PromotionCode extends Model
{
    use HasFactory;

    protected $fillable = [
        "partner_id",
        "program_id",
        "code",
        "use_limit",
        "discount",
        "commission_rate",
        "start_date",
        "expired_date",
    ];

    public function partner(): BelongsTo
    {
        return $this->belongsTo(User::class, "partner_id");
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class, "program_id");
    }

    /**
     * One to Many relation ship between promotion_codes and commission_histories
     *
     * @return HasMany
     */
    public function histories(): HasMany
    {
        return $this->hasMany(CommissionHistory::class, "promotion_id");
    }
}
