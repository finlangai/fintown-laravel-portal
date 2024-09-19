<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

class FinancialStatementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * @OA\Get(
     *      path="/api/symbols/{company}/financial-statements",
     *      operationId="TestId",
     *      tags={"Symbols"},
     *      summary="Financial Statement",
     *      description="Retrieve a specific type of financial statements for a company",
     *      @OA\Parameter(
     *          description="Statement type",
     *          in="path",
     *          name="type",
     *          required=true,
     *          @OA\Schema(type="int"),
     *          @OA\Examples(example="Balance Sheet", value="1", summary="Balance Sheet"),
     *          @OA\Examples(example="Income Statement", value="2", summary="Income Statement"),
     *          @OA\Examples(example="Cashflow Statement", value="3", summary="Cashflow Statement"),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="success",
     *       ),
     *     )
     */
    public function show(string $id)
    {
        //
    }

}
