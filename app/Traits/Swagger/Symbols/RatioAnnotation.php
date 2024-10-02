<?php

namespace App\Traits\Swagger\Symbols;

trait RatioAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/symbols/{company}/ratio?year=2024&quarter=4&limit=10",
     *      operationId="GetFinancialRatios",
     *      tags={"Symbols"},
     *      summary="Financial Metrics",
     *      description="Retrieve a Financial Metrics and Ratios of a company",
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
     *          description="The amount of statement to get. Max is 10",
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
     *          description="No statements found",
     *       ),
     *      @OA\Response(
     *          response=422,
     *          description="Insufficent parameters",
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal Server Error",
     *       ),
     *     )
     */
    public function RatioAnnotation()
    {}
}
