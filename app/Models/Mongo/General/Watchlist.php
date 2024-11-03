<?php

namespace App\Models\Mongo\General;

use MongoDB\Laravel\Eloquent\Model;

class Watchlist extends Model
{
    const COLLECTION_NAME = "watchlists";

    protected $connection = "mongodb";
    protected $table = self::COLLECTION_NAME;

    protected $hidden = ["id"];
    protected $fillable = ["symbols"];

    /**
     * Check if the input symbol present in the user's watchlist, false if the user hasn't logged in
     *
     * @param string $symbol
     * @return boolean
     */
    public static function checkSymbol(string $symbol): bool
    {
        if (!auth("api")->check()) {
            return false;
        }

        $result = self::raw(
            fn($collection) => $collection->findOne([
                "_id" => auth("api")->user()->id,
                "symbols" => ['$elemMatch' => ['$eq' => $symbol]],
            ])
        );

        return $result !== null;
    }
}
