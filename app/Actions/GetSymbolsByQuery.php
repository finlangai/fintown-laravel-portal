<?php

namespace App\Actions;

use App\Models\Mongo\Company\Company;
use Illuminate\Support\Collection;
use Lorisleiva\Actions\Concerns\AsAction;

class GetSymbolsByQuery
{
    use AsAction;

    public function handle(string $query, int $limit, array $projection): false | Collection
    {
        // First try, query with text index
        $result = Company::whereRaw([
            '$text' => [
                '$search' => $query,
             ],
         ])->project($projection)
            ->limit($limit)
            ->get();

        if ($result->count() == 0) {
            // Second try, query with regex
            $result = Company::raw(function ($collection) use ($query, $limit, $projection) {
                return $collection->aggregate([
                    [
                        '$match' => [
                            '$or' => [
                                [ 'symbol' => [ '$regex' => $query, '$options' => 'i' ] ],
                                [ 'company_name' => [ '$regex' => $query, '$options' => 'i' ] ],
                             ],
                         ],
                     ],
                    [
                        '$project' => $projection,
                     ],
                    [
                        '$limit' => $limit,
                     ],
                 ]);
            });
        }
        
        if ($result->count() == 0) {
            return false;
        }

        return $result;
    }
}
