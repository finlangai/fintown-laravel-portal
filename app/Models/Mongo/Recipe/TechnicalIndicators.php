<?php

namespace App\Models\Mongo\Recipe;

use MongoDB\Laravel\Eloquent\Model;

class TechnicalIndicators extends Model
{
    protected $connection = 'mongodb';
    
    protected $table = 'formular_library';

    protected $hidden = ['id'];

    public $timestamps = false;

    // Thêm vào đây
    protected $fillable = [
        'metadata.order',
        'metadata',
        'library' ,
        'display_name',
        'name'
    ];
}
