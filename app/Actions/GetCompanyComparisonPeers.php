<?php

namespace App\Actions;

use App\Models\Mongo\Company\Stash;
use Lorisleiva\Actions\Concerns\AsAction;
use MongoDB\Collection;

class GetCompanyComparisonPeers
{
    use AsAction;

    public function handle(string $symbol)
    {
        $result = Stash::raw(
            fn(Collection $collection) => $collection->aggregate([
                ['$match' => ["symbol" => $symbol]],
                ['$limit' => 1],
                ...self::getIndustryPeersStages($symbol),
                ...self::getRamdonPeersStages($symbol),
                ...self::getMapPeersStages(),
                ['$unwind' => '$peers'],
                ['$replaceRoot' => ["newRoot" => '$peers']],
                ...GetComparisonData::getMetaDataStages(),
                [
                    '$project' => [
                        "symbol" => 1,
                        "comparison" => 1,
                        "companyInfo" => 1,
                    ],
                ],
            ])
        );
        return GetComparisonData::processPeersData($result);
    }

    public static function getIndustryPeersStages(string $symbol)
    {
        return [
            [
                '$lookup' => [
                    "from" => "stash",
                    "localField" => "industry",
                    "foreignField" => "industry",
                    "as" => "peers",
                    "pipeline" => [
                        ['$match' => ["symbol" => ['$ne' => $symbol]]],
                        ['$limit' => 4],
                    ],
                ],
            ],
        ];
    }

    public static function getMapPeersStages()
    {
        return [
            [
                '$addFields' => [
                    "peers" => [
                        '$cond' => [
                            "if" => ['$gt' => [['$size' => '$peers'], 0]],
                            "then" => '$peers',
                            "else" => '$random_peers',
                        ],
                    ],
                ],
            ],
            [
                '$addFields' => [
                    "peers" => [
                        '$concatArrays' => [
                            [
                                [
                                    "symbol" => '$symbol',
                                    "industry" => '$industry',
                                    "comparison" => '$comparison',
                                ],
                            ],
                            '$peers',
                        ],
                    ],
                ],
            ],
        ];
    }

    public static function getRamdonPeersStages(string $symbol)
    {
        return [
            [
                '$lookup' => [
                    "from" => "stash",
                    "pipeline" => [
                        [
                            '$match' => [
                                "is_stock" => ['$ne' => false],
                                "symbol" => ['$ne' => $symbol],
                            ],
                        ],
                        ['$sample' => ["size" => 4]],
                    ],
                    "as" => "random_peers",
                ],
            ],
        ];
    }
}
