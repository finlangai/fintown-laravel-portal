<?php

namespace App\Traits\Swagger\Symbols;

trait DividendsAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/symbols/{symbol}/dividends",
     *      operationId="GetCompanyDividends",
     *      tags={"Symbols"},
     *      summary="Dividends",
     *      description="Retrieve dividend records of a company",
     *      @OA\Parameter(
     *          description="Symbol of the instrument",
     *          in="path",
     *          name="symbol",
     *          @OA\Schema(type="string"),
     *          @OA\Examples(example="Vietcombank", value="VCB", summary="Vietcomebank"),
     *          @OA\Examples(example="MB Bank", value="MBB", summary="MB Bank"),
     *          @OA\Examples(example="Vietnamilk", value="VNM", summary="Vietnamilk"),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Success",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(
     *                  property="cashLegend",
     *                  type="array",
     *                  @OA\Items(
     *                      type="object",
     *                      @OA\Property(property="year", type="integer", example=2024),
     *                      @OA\Property(property="value", type="integer", example=0)
     *                  )
     *              ),
     *              @OA\Property(
     *                  property="stockLegend",
     *                  type="array",
     *                  @OA\Items(
     *                      type="object",
     *                      @OA\Property(property="year", type="integer", example=2024),
     *                      @OA\Property(property="value", type="number", format="float", example=20)
     *                  )
     *              ),
     *              @OA\Property(
     *                  property="records",
     *                  type="array",
     *                  @OA\Items(
     *                      type="object",
     *                      @OA\Property(property="title", type="string", example="Cổ tức đợt 1/2023 bằng tiền, tỷ lệ 1000đ/CP"),
     *                      @OA\Property(property="type", type="integer", example=1),
     *                      @OA\Property(property="recordDate", type="string", example="23/09/2024"),
     *                      @OA\Property(property="executionDate", type="string", example="18/10/2024")
     *                  )
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized",
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="No dividend records found",
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal Server Error",
     *       )
     * )
     */
    public function DividendsAnnotation()
    {
    }
}
