<?php

namespace App\Actions;

use App\Http\Controllers\API\Symbols\AssessmentsController;
use Exception;
use App\Models\Mongo\Company\Assessment;
use App\Traits\GetAssessmentCriterias;
use App\Utils\ApiResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Lorisleiva\Actions\Concerns\AsAction;

class GetGeneralAssessment
{
    use AsAction, GetAssessmentCriterias;
    public $criterias;
    public function __construct()
    {
        $this->criterias = $this->getAssessmentCriterias();
    }

    public function handle(string $symbol)
    {
        try {
            $assessment = Assessment::where("symbol", strtoupper($symbol))
                ->project($this->getProjection())
                ->firstOrFail()
                ->toArray();
        } catch (ModelNotFoundException $e) {
            return false;
        }
        // remove \n for assessment
        $assessment["overall"] = str_replace("\n", "", $assessment["overall"]);

        // Loop through each criteria
        foreach ($this->criterias as $cr) {
            $criteriaSlug = $cr["slug"];
            // Map cluster name for all clusters
            $criteriaData = &$assessment["criterias"][$criteriaSlug];
            $group = &$criteriaData["group"];
            $clusterStatuses = &$group["status"];

            // remove \n for all assessment
            $insight = &$criteriaData["insight"];
            $insight = str_replace("\n", "", $insight);

            // add name for criteria
            $criteriaData["name"] = $cr["name"];

            $originalClustersInfo = $cr["group"];
            $clusterInfos = [];
            foreach ($originalClustersInfo as $index => $info) {
                // skip if the cluster is null
                if (!$clusterStatuses[$index]) {
                    continue;
                }
                $clusterInfos[] = [
                    "index" => $index,
                    "name" => $info["name"],
                    "status" => $clusterStatuses[$index],
                ];
            }
            $group = $clusterInfos;
        }
        return $assessment;
    }

    private function getProjection()
    {
        $insightsProjections = ["overall" => "\$insights.overall"];
        $criteriasProjection = [];

        foreach ($this->criterias as $criteria) {
            $criteriaSlug = $criteria["slug"];
            $insightsProjections[
                $criteriaSlug
            ] = "\$insights.$criteriaSlug.assessment";

            $statusesMap = [
                "status" => [
                    '$map' => [
                        "input" => "\$insights.$criteriaSlug.groups",
                        "as" => "group",
                        "in" => [
                            '$ifNull' => ['$$group.status', null],
                        ],
                    ],
                ],
            ];
            $criteriasProjection[$criteriaSlug] = [
                "insight" => "\$insights.$criteriaSlug.assessment",
                "status" => "\$insights.$criteriaSlug.status",
                "group" => $statusesMap,
            ];
        }
        return [
            "overall" => "\$insights.overall",
            "criterias" => $criteriasProjection,
            // "insights" => $insightsProjections,
        ];
    }
}
