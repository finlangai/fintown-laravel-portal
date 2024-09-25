<?php

namespace App\Models\SQL\Subcription;

use App\Models\SQL\User\Type;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsTo;
use MongoDB\Laravel\Relations\HasMany;

class Program extends Model
{
    use HasFactory;

    protected $table = 'subcription_programs';

    public function incharge(): BelongsTo
    {
        return $this->belongsTo(Type::class, 'incharge_id', 'id');
    }

    public function subcriptions(): HasMany
    {
        return $this->hasMany(Subcription::class, "program_id");
    }

    public function promotionCodes(): HasMany
    {
        return $this->hasMany(PromotionCode::class, 'program_id');
    }
}
