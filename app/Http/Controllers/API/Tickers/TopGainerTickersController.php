<?php

namespace App\Http\Controllers\API\Tickers;

use App\Actions\GetTopGainerTickers;
use App\Http\Controllers\Controller;
use App\Http\Requests\TopGainerTickersRequest;
use App\Utils\ApiResponse;
use Illuminate\Http\Request;

class TopGainerTickersController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(
        TopGainerTickersRequest $request,
        GetTopGainerTickers $action
    ) {
        $validated = $request->validated();

        $result = $action->handle($validated);

        if (!$result) {
            return ApiResponse::notFound("Không tìm thấy công ty");
        }

        return ApiResponse::success($result);
    }
}
