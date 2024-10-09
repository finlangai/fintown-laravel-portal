<?php

namespace App\Traits\Swagger\Symbols;

trait FluctuationAnnotation
{
    /**
     * @OA\Get(
     *     path="/api/symbols/{symbol}/fluctuation",
     *     operationId="GetCompanyFluctuation",
     *     tags={"Symbols"},
     *     summary="Company Fluctuation",
     *     description="Retrieve the fluctuations of a company",
     *     @OA\Parameter(
     *         description="Symbol of the instrument",
     *         in="path",
     *         name="symbol",
     *         @OA\Schema(type="string"),
     *         @OA\Examples(example="Vietcombank", value="VCB", summary="Vietcomebank"),
     *         @OA\Examples(example="MB Bank", value="MBB", summary="MB Bank"),
     *         @OA\Examples(example="Vietnamilk", value="VNM", summary="Vietnamilk"),
     *     ),
     *     @OA\Response(
     *          response=200,
     *          description="Success",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(
     *                  property="open",
     *                  type="integer",
     *                  example=25950
     *              ),
     *              @OA\Property(
     *                  property="high",
     *                  type="integer",
     *                  example=26300
     *              ),
     *              @OA\Property(
     *                  property="low",
     *                  type="integer",
     *                  example=25700
     *              ),
     *              @OA\Property(
     *                  property="close",
     *                  type="integer",
     *                  example=25700
     *              ),
     *              @OA\Property(
     *                  property="volume",
     *                  type="integer",
     *                  example=14798400
     *              ),
     *              @OA\Property(
     *                  property="avg52Week",
     *                  type="number",
     *                  format="float",
     *                  example=22701.15
     *              ),
     *              @OA\Property(
     *                  property="avg200day",
     *                  type="number",
     *                  format="float",
     *                  example=23413.4
     *              ),
     *              @OA\Property(
     *                  property="avg150day",
     *                  type="number",
     *                  format="float",
     *                  example=23989.8
     *              ),
     *              @OA\Property(
     *                  property="avg24day",
     *                  type="number",
     *                  format="float",
     *                  example=25143.75
     *              ),
     *              @OA\Property(
     *                  property="previousClosingPrice",
     *                  type="integer",
     *                  example=25800
     *              )
     *          )
     *      ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No statements found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error"
     *     ),
     * )
     */
    public function FluctuationAnnotation()
    {
    }
}
