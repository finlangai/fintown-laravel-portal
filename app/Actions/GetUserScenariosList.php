<?php

namespace App\Actions;

use App\Models\Mongo\Formular;
use App\Models\Mongo\General\ValuationScenario;
use App\Utils\Util;
use Lorisleiva\Actions\Concerns\AsAction;
use MongoDB\Laravel\Eloquent\Builder;

class GetUserScenariosList
{
    use AsAction;

    public function handle(Formular $formularInfo, string $symbol)
    {
        $userId = auth("api")->id();
        $query = ValuationScenario::where("symbol", $symbol)
            ->where("type_id", $formularInfo->id)
            ->where("user_id", $userId)
            ->orderBy("created_at", "desc");

        $this->processTimeFilter($query);

        $scenarios = $query->get();
        $scenarios->map(function ($item) {
            $item["saveAt"] = $item["updated_at"]->format("d/m/Y");
            unset($item["updated_at"]);
            unset($item["type_id"]);
        });

        $result = Util::CamelizeArray($scenarios->toArray());

        return $result;
    }

    private function processTimeFilter(Builder $query)
    {
        $validated = request()->validate([
            "year" => "nullable|integer",
            "month" => "nullable|integer|min:1|max:12",
        ]);

        $andConditions = [];

        if (array_key_exists("year", $validated)) {
            $andConditions[] = [
                '$eq' => [
                    intval($validated["year"]),
                    ['$year' => '$updated_at'],
                ],
            ];
        }
        if (array_key_exists("month", $validated)) {
            $andConditions[] = [
                '$eq' => [
                    intval($validated["month"]),
                    ['$month' => '$updated_at'],
                ],
            ];
        }

        if (!empty($andConditions)) {
            $query->whereRaw([
                '$expr' => [
                    '$and' => $andConditions,
                ],
            ]);
        }
    }
}
