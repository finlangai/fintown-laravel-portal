<?php

namespace App\Traits\Swagger\Symbols;

trait ComparisonSearchAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/symbols/comparison/search",
     *      operationId="SearchComparisonData",
     *      tags={"Symbols"},
     *      summary="Search Comparison Data",
     *      description="Search comparison spec of many companies",
     *      @OA\Parameter(
     *          name="q",
     *          in="query",
     *          required=true,
     *          @OA\Schema(type="string"),
     *          @OA\Examples(
     *              example="example1",
     *              value="Ngân hàng",
     *              summary="Example query parameter"
     *          ),
     *          description="Search query for symbols or company names"
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Success",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(
     *                  @OA\Property(property="symbol", type="string", example="ACB"),
     *                  @OA\Property(property="logo", type="string", example="https://firebasestorage.googleapis.com/v0/b/fintown-4ddd6.appspot.com/o/logo%2FACB.jpeg?alt=media"),
     *                  @OA\Property(property="quarter", type="integer", example=3),
     *                  @OA\Property(property="year", type="integer", example=2024)
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="No resources found"
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="Insufficient parameters"
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal Server Error"
     *      )
     * )
     */
    public function ComparisonSearchAnnotation()
    {
    }
}
