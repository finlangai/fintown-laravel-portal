<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\SearchSymbolRequest;
use App\Models\Mongo\Company\Company;
use App\Utils\ApiResponse;
use Illuminate\Http\Request;

class SymbolSearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(SearchSymbolRequest $request)
    {
        $query  = $request->input('q');
        $result = Company::whereRaw([
            '$text' => [
                '$search' => $query,
             ],
         ])->project([
            'stock_symbol'     => 1,
            'company_name'     => 1,
            'profile.exchange' => 1,
         ])->get();
        return ApiResponse::success($result);
    }
}
