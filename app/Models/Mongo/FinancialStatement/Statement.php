<?php

namespace App\Models\Mongo\FinancialStatement;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Statement extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'financial_statements';

    public $timestamps = false;
}
