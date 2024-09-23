<?php

namespace App\Models\SQL\User;

use App\Models\SQL\Subcription\Program;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsToMany;
use MongoDB\Laravel\Relations\HasMany;

class Type extends Model
{
    use HasFactory;

    protected $table = 'user_types';

    public function features(): BelongsToMany
    {
        return $this->belongsToMany(Feature::class, 'user_type_features', 'type_id', 'feature_id');
    }

    public function subcriptionPrograms(): HasMany
    {
        return $this->hasMany(Program::class, 'incharge_id');
    }
}
