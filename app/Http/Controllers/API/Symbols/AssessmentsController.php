<?php

namespace App\Http\Controllers\API\Symbols;

use App\Actions\GetCriteriaAssessment;
use App\Actions\GetGeneralAssessment;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\AssessmentCriteriaRequest;
use App\Models\Mongo\System\Criteria;
use App\Utils\ApiResponse;
use App\Utils\Redis;

class AssessmentsController extends Controller
{
    public string $baseCacheName = "symbols:%s:assessment:%s";

    public function __invoke(string $symbol, GetGeneralAssessment $action)
    {
        $cacheName = sprintf(
            $this->baseCacheName,
            strtoupper($symbol),
            "overview"
        );
        $cache = Redis::get($cacheName);
        // check cache
        if ($cache) {
            return ApiResponse::success($cache);
        }

        $result = $action->handle($symbol);

        if (!$result) {
            return ApiResponse::notFound("Không tìm thấy công ty");
        }

        // set cache
        Redis::set($cacheName, $result, 48);

        return ApiResponse::success($result);
    }

    public function criteria(
        string $symbol,
        AssessmentCriteriaRequest $request,
        GetCriteriaAssessment $action
    ) {
        $validated = $request->validated();
        $typeIndex = $validated["type"];
        $groupIndex = $validated["group"] ?? null;

        $criteriaInfo = Criteria::where("id", intval($typeIndex))->first();
        if (!$criteriaInfo) {
            return ApiResponse::notFound("Không tìm thấy tiêu chí");
        }

        $result = $action->handle(
            $symbol,
            $criteriaInfo->toArray(),
            $groupIndex
        );

        if (!$result) {
            return ApiResponse::notFound("Không tìm thấy tài nguyên");
        }

        return ApiResponse::success($result);
    }
}
