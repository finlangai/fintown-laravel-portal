<?php

namespace App\Models\Mongo\Company;

use App\Models\Mongo\MetricRecord;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\HasMany;

class Company extends Model
{
    protected $connection = "mongodb";
    protected $table = "companies";

    protected $hidden = ["id"];
    public $timestamps = false;

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return "symbol";
    }

    public function metrics(): HasMany
    {
        return $this->hasMany(MetricRecord::class, "symbol", "symbol");
    }

    public function quotes(): HasMany
    {
        return $this->hasMany(Quote::class, "symbol", "symbol");
    }
}
