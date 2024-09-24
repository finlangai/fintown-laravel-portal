<?php

namespace App\Models\SQL\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsToMany;

class Feature extends Model
{
    use HasFactory;

    public function types(): BelongsToMany
    {
        return $this->belongsToMany(Feature::class, 'user_type_features', 'feature_id', 'type_id');
    }
}
