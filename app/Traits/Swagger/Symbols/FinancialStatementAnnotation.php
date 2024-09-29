<?php

namespace App\Traits\Swagger\Symbols;

trait FinancialStatementAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/symbols/{company}/financial-statements?type=1&year=2024&quarter=4&limit=10",
     *      operationId="GetFinancialStatement",
     *      tags={"Symbols"},
     *      summary="Financial Statement",
     *      description="Retrieve a specific type of financial statements for a company",
     *      @OA\Parameter(
     *          description="Company Symbol",
     *          in="path",
     *          name="company",
     *          @OA\Schema(type="string"),
     *          @OA\Examples(example="Vietcombank", value="VCB", summary="Vietcomebank"),
     *          @OA\Examples(example="MB Bank", value="MBB", summary="MB Bank"),
     *          @OA\Examples(example="Vietnamilk", value="VNM", summary="Vietnamilk"),
     *      ),
     *      @OA\Parameter(
     *          description="Statement type",
     *          in="query",
     *          name="type",
     *          @OA\Schema(type="int"),
     *          @OA\Examples(example="Balance Sheet", value="1", summary="Balance Sheet"),
     *          @OA\Examples(example="Income Statement", value="2", summary="Income Statement"),
     *          @OA\Examples(example="Cashflow Statement", value="3", summary="Cashflow Statement"),
     *      ),
     *      @OA\Parameter(
     *          description="Year",
     *          in="query",
     *          name="year",
     *          @OA\Schema(type="int"),
     *          @OA\Examples(example="Year", value="2024", summary="A year"),
     *      ),
     *      @OA\Parameter(
     *          description="Quarter value to query retrieve from a specific quarter or retrieve yearly statements",
     *          in="query",
     *          name="quarter",
     *          @OA\Schema(type="int"),
     *          @OA\Examples(example="First Quarter", value="1", summary="First Quarter"),
     *          @OA\Examples(example="Second Quarter", value="2", summary="Second Quarter"),
     *          @OA\Examples(example="Third Quarter", value="3", summary="Third Quarter"),
     *          @OA\Examples(example="Fourth Quarter", value="4", summary="Fourth Quarter"),
     *          @OA\Examples(example="Yearly", value="0", summary="Yearly"),
     *      ),
     *      @OA\Parameter(
     *          description="The amount of ratios to get. Max is 10",
     *          in="query",
     *          name="limit",
     *          @OA\Schema(type="int"),
     *          @OA\Examples(example="Limit", value="10", summary="Limit value"),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Success",
     *       ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized",
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="No ratio records found",
     *       ),
     *      @OA\Response(
     *          response=422,
     *          description="Insufficent parameters",
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal server error",
     *       ),
     *     )
     */
    public function FinancialStatementAnnotation()
    {}
}
