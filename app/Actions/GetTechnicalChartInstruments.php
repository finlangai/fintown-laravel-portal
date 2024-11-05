<?php

namespace App\Actions;

use App\Enums\InstrumentCategory;
use App\Traits\CheckKeyAndSet;
use App\Traits\ProcessLimitAndOffset;
use App\Traits\Stages\TechnicalChartInstrumentsStages;
use App\Utils\ApiResponse;
use App\Utils\Util;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;
use MongoDB\Model\BSONDocument;

class GetTechnicalChartInstruments
{
    use AsAction,
        ProcessLimitAndOffset,
        TechnicalChartInstrumentsStages,
        CheckKeyAndSet;

    private array $validated;

    private string $category;
    private ?array $symbols = null;
    private ?string $search = null;

    private ?int $limit = null;
    private ?int $offset = null;

    /**
     * This action aggregate data from 4 collection
     *
     * @param array $validated
     * @return mixed
     */
    public function handle(array $validated)
    {
        $this->validated = $validated;
        $this->processLimitAndOffset($validated);

        $this->checkKeyAndSet($validated, "category");

        $isLoggedIn = auth("api")->check();

        // if the category is watchlist but no valid auth token, return unauthorized
        if (
            $this->category == InstrumentCategory::WATCHLIST->value &&
            !$isLoggedIn
        ) {
            return ApiResponse::unauthorized();
        }

        list($collectionName, $firstStages) = $this->getFirstStage();

        // build the aggregation pipeline
        $aggregationPipeline = [
            ...$firstStages,
            ...$this->getStagesForCompanyInfo(),
            ...$this->getStagesForLatestQuote(),
            ...$this->getStagesForDelta(),
        ];

        // === add watchlist checking stage if ig logged in
        if ($isLoggedIn) {
            $aggregationPipeline = array_merge(
                $aggregationPipeline,
                $this->getStagesForCheckingWatchlist(auth("api")->id())
            );
        }

        // connect to mongodb and get the collection
        $collection = DB::connection("mongodb")->getCollection($collectionName);
        // execute the aggregation
        $result = $collection->aggregate($aggregationPipeline)->toArray();

        // === Flatten the result and round the delta value
        $result = iterator_to_array($result);
        $result = array_map(function (BSONDocument $item) use ($isLoggedIn) {
            $flattened = Util::flattenLookUpAggregation($item->getArrayCopy());
            // rounding delta value to 2 digit
            $flattened["delta"] = round($flattened["delta"], 2);
            // having isInWatchlist as false by default if not logged in
            if (!$isLoggedIn) {
                $flattened["isInWatchlist"] = false;
            }
            return $flattened;
        }, $result);

        // sort on symbol if not watchlist
        if ($this->category != InstrumentCategory::WATCHLIST->value) {
            usort($result, function ($a, $b) {
                return strcmp($a["symbol"], $b["symbol"]);
            });
        }

        return $result;
    }
}
