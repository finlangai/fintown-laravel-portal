<?php

namespace App\Actions;

use App\Models\Mongo\Company\Assessment;
use App\Models\Mongo\System\Criteria;
use App\Utils\Util;
use Lorisleiva\Actions\Concerns\AsAction;
use MongoDB\Builder\Query;
use PhpParser\Node\Identifier;

class GetCriteriaAssessment
{
    use AsAction;

    public string $symbol;
    public array $identifiers = [];
    public array $metricsProjection = ["year" => 1];

    public function handle(
        string $symbol,
        array $criteriaInfo,
        int $groupIndex = null
    ) {
        // set instance's variables
        $this->symbol = strtoupper($symbol);
        // map all required local variables
        $this->mapLocalVariables($criteriaInfo["group"]);

        // aggrerating from assessment, metric_records, formular_library
        $rawData = $this->getFinalPipeline($criteriaInfo["slug"])->first();

        // remove new line (\n) in all assessments
        $rawData["clusters"] = Util::removeNewLine($rawData["clusters"]);

        // declare final response
        $result = [];
        // loop through each cluster and map data into appropriate shape
        foreach ($rawData["clusters"] as $index => $cluster) {
            // continue if the cluster is null
            if (is_null($cluster)) {
                $result[] = null;
                continue;
            }
            $cluster["title"] = $criteriaInfo["group"][$index]["name"];
            // create accumulator for existing metrics
            $clusterMetrics = [];
            // for each existing metrics, map into the cluster its meta, historical and forecasted data
            foreach ($cluster["metrics"] as $identifier) {
                // get the first formular info the metric
                $metricInfo = array_filter(
                    $rawData["formulars"],
                    fn($formular) => $formular["identifier"] == $identifier
                );
                // move the point to the first filtered element and get it
                $metricInfo = reset($metricInfo);
                $metricMeta = $metricInfo["metadata"];

                // declaring metric data
                $metricData = [
                    "name" => $metricInfo["display_name"],
                    "isPercentage" => $metricMeta["is_percentage"],
                    "unit" => $metricMeta["unit"],
                    "historical" => [],
                    "forecast" => [],
                ];
                // geting the flag
                $isShouldDivineByBillion =
                    $metricInfo["metadata"]["is_should_divine_by_billion"];

                // map corresponding data into array
                $dataKeys = ["historical", "forecast"];
                foreach ($dataKeys as $key) {
                    foreach ($rawData[$key] as $record) {
                        $metricValue = $record["metrics"][$identifier];

                        // check if should divine by billion
                        if ($isShouldDivineByBillion) {
                            $metricValue /= 1000000000;
                        }
                        $metricValue = round($metricValue, 2);

                        $metricData[$key][] = [
                            "year" => $record["year"],
                            "value" => $metricValue,
                        ];
                    }
                    // sorting asc
                    usort(
                        $metricData[$key],
                        fn($q1, $q2) => $q1["year"] > $q2["year"]
                    );
                }
                $clusterMetrics[] = $metricData;
            }
            // replace metrics field
            $cluster["metrics"] = $clusterMetrics;
            // push new cluster into the result
            $result[] = $cluster;
        }

        if (isset($groupIndex)) {
            if (!array_key_exists($groupIndex, $result)) {
                return false;
            }
            return $result[$groupIndex];
        }
        return $result;
    }

    private function mapLocalVariables(array $clusters)
    {
        // have all identifiers of the criteria in an array
        foreach ($clusters as $cluster) {
            $this->identifiers = array_merge(
                $this->identifiers,
                $cluster["metrics"]
            );
        }
        // set projection for metrics on forecast and records
        foreach ($this->identifiers as $identifier) {
            $this->metricsProjection["metrics." . $identifier] = 1;
        }
    }

    public function getFinalPipeline(string $criteriaSlug)
    {
        return Assessment::aggregate()
            ->match(Query::query(symbol: Query::eq($this->symbol)))
            ->project(
                _id: 0,
                clusters: "\$insights.$criteriaSlug.groups",
                forecast: $this->metricsProjection
            )
            ->lookup(
                from: "metric_records",
                let: ["symbol" => '$symbol'],
                pipeline: $this->getMetricRecordsPipeline(),
                as: "historical"
            )
            ->lookup(
                from: "formular_library",
                let: ["identifier" => $this->identifiers],
                pipeline: $this->getFormularsPipeline(),
                as: "formulars"
            );
    }

    public function getFormularsPipeline()
    {
        return [
            [
                '$match' => [
                    "identifier" => ['$in' => $this->identifiers],
                ],
            ],
            [
                '$project' => [
                    "_id" => 0,
                    "identifier" => 1,
                    "display_name" => 1,
                    "metadata" => 1,
                ],
            ],
        ];
    }

    public function getMetricRecordsPipeline()
    {
        return [
            [
                '$match' => [
                    '$expr' => [
                        '$and' => [
                            ['$eq' => ['$symbol', $this->symbol]],
                            ['$eq' => ['$quarter', 0]],
                        ],
                    ],
                ],
            ],
            [
                '$sort' => ["year" => -1],
            ],
            [
                '$limit' => 5,
            ],
            [
                '$project' => array_merge($this->metricsProjection, [
                    "_id" => 0,
                ]),
            ],
        ];
    }
}
