<?php

namespace App\Traits\Swagger\Symbols;

trait ComparisonRetrieveAnnotation
{
    /**
     * @OA\Post(
     *      path="/api/symbols/comparison",
     *      operationId="RetrieveComparisonData",
     *      tags={"Symbols"},
     *      summary="Retrieve Comparison Data",
     *      description="Retrieve comparison spec of many companies",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *              required={"symbols"},
     *              @OA\Property(
     *                  property="symbols",
     *                  type="array",
     *                  @OA\Items(type="string"),
     *                  example={"HPG", "MBB", "SSI"}
     *              ),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Success",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(
     *                  @OA\Property(property="symbol", type="string", example="HPG"),
     *                  @OA\Property(
     *                      property="comparison",
     *                      type="object",
     *                      @OA\Property(property="rating", type="number", format="float", example=4.94),
     *                      @OA\Property(property="trending", type="number", format="float", example=5.8),
     *                      @OA\Property(property="dividend", type="number", format="float", example=2),
     *                      @OA\Property(property="returns", type="number", format="float", example=10),
     *                      @OA\Property(property="revenueProfit", type="number", format="float", example=4.4),
     *                      @OA\Property(property="momentum", type="number", format="float", example=2.5),
     *                  ),
     *                  @OA\Property(property="logo", type="string", example="https://firebasestorage.googleapis.com/v0/b/fintown-4ddd6.appspot.com/o/logo%2FHPG.jpeg?alt=media")
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
    public function ComparisonRetrieveAnnotation()
    {
    }
}
