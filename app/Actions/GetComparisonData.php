<?php

namespace App\Actions;

use App\Models\Mongo\Company\Stash;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Lorisleiva\Actions\Concerns\AsAction;
use MongoDB\Collection;

class GetComparisonData
{
    use AsAction;

    public function handle(array $symbols)
    {
        $result = Stash::raw(
            fn(Collection $collection) => $collection->aggregate([
                ...self::getMatchComparisonStages($symbols),
                ...self::getMetaDataStages(),
                [
                    '$project' => [
                        "symbol" => 1,
                        "companyInfo" => 1,
                        "comparison" => 1,
                    ],
                ],
            ])
        );
        return self::processPeersData($result);
    }

    public static function processPeersData(EloquentCollection $peers)
    {
        $peers->map(function ($item) {
            $item["logo"] = $item["companyInfo"][0]["logo"];
            unset($item["companyInfo"]);
        });
        return $peers;
    }

    public static function getMatchComparisonStages(array $symbols)
    {
        return [
            // Match documents where 'is_stock' is not false
            [
                '$match' => [
                    "is_stock" => ['$ne' => false],
                    "symbol" => ['$in' => $symbols],
                ],
            ],
        ];
    }

    public static function getMetaDataStages()
    {
        return [
            [
                '$lookup' => [
                    "from" => "companies",
                    "localField" => "symbol",
                    "foreignField" => "symbol",
                    "pipeline" => [
                        ['$project' => ["_id" => 0, "logo" => 1]],
                        ['$limit' => 1],
                    ],
                    "as" => "companyInfo",
                ],
            ],
        ];
    }
}
