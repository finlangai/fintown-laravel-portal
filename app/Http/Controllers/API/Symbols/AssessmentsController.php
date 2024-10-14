<?php

namespace App\Http\Controllers\API\Symbols;

use App\Actions\GetGeneralAssessment;
use App\Http\Controllers\Controller;
use App\Models\Mongo\Company\Assessment;
use App\Utils\ApiResponse;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AssessmentsController extends Controller
{
    public function __invoke(string $symbol, GetGeneralAssessment $action)
    {
        $result = $action->handle($symbol);

        if (!$result) {
            return ApiResponse::notFound("Không tìm thấy công ty");
        }

        return ApiResponse::success($result);
    }
}
