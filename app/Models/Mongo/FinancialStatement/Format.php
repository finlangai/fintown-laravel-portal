<?php

namespace App\Models\Mongo\FinancialStatement;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Format extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'statement_formats';

    protected $hidden = [ 'id' ];
    public $timestamps = false;
}
