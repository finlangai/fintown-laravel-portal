<?php

namespace App\Models\Mongo\FinancialStatement;

use App\Traits\QueryBySymbolPeriod;
use MongoDB\Laravel\Eloquent\Model;

class Statement extends Model
{
    use QueryBySymbolPeriod;

    protected $connection = 'mongodb';
    protected $table      = 'financial_statements';

    protected $hidden  = [ 'id' ];
    public $timestamps = false;

}
