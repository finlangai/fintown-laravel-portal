<?php

namespace App\Models\Mongo;

use App\Models\Mongo\Company\Company;
use App\Traits\QueryBySymbolPeriod;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsTo;

class MetricRecord extends Model
{
    use QueryBySymbolPeriod;

    protected $connection = 'mongodb';
    protected $table      = 'metric_records';

    protected $hidden  = [ 'id' ];
    public $timestamps = false;

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'symbol', 'symbol');
    }
}
