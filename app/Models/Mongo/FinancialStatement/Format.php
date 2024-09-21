<?php

namespace App\Models\Mongo\FinancialStatement;

use MongoDB\Laravel\Eloquent\Model;

class Format extends Model
{
    protected $connection = 'mongodb';
    protected $table      = 'statement_formats';

    protected $hidden  = [ 'id' ];
    public $timestamps = false;

    public static function getByICB(string $icb_code)
    {
        return self::where(function ($query) use ($icb_code) {
            $query->where('icb_ranges', 'elemMatch', [
                'start' => [ '$lte' => $icb_code ],
                'end'   => [ '$gte' => $icb_code ],
             ]);
        })->first();
    }
}
