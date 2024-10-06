<?php 
namespace App\Models\Mongo\Holders;
use MongoDB\Laravel\Eloquent\Model;
class Holder extends Model
{
    protected $connection = 'mongodb'; 
    protected $collection = 'holders'; 
    public $timestamps = false;

    protected $fillable = [
        'symbol',
        'name',
        'position',
        'shares',
        'ownership',
        'is_organization',
        'is_foreigner',
        'is_founder',
    ];
    public static function getBySymbol(string $symbol)
    {
        return self::where('symbol', $symbol)->get();
    }
}
?>