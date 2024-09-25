<?php

namespace App\Models\SQL\Subcription;

use App\Models\SQL\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsTo;

class CommissionHistory extends Model
{
    use HasFactory;
    const UPDATED_AT = null;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function promotion(): BelongsTo
    {
        return $this->belongsTo(PromotionCode::class, 'promotion_id');
    }
}
