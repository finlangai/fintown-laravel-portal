<?php

namespace App\Traits\Swagger\Symbols;

trait InternalTransactionsAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/symbols/{symbol}/transactions",
     *      operationId="GetCompanyTransactions",
     *      tags={"Symbols"},
     *      summary="Company Transactions",
     *      description="Retrieve transactions of a company",
     *      @OA\Parameter(
     *          description="Symbol of the instrument",
     *          in="path",
     *          name="symbol",
     *          @OA\Schema(type="string"),
     *          @OA\Examples(example="Vietcombank", value="VCB", summary="Vietcomebank"),
     *          @OA\Examples(example="MB Bank", value="MBB", summary="MB Bank"),
     *          @OA\Examples(example="Vietnamilk", value="VNM", summary="Vietnamilk"),
     *      ),
     *      @OA\Parameter(
     *          name="limit",
     *          in="query",
     *          description="Limit the number of results returned",
     *          required=false,
     *          @OA\Schema(
     *              type="integer",
     *              minimum=1,
     *              default=10
     *          ),
     *          @OA\Examples(example="Limit", value=20, summary="20 transactions data")
     *      ),
     *      @OA\Parameter(
     *          name="offset",
     *          in="query",
     *          description="Offset the start of the results",
     *          required=false,
     *          @OA\Schema(
     *              type="integer",
     *              minimum=0,
     *              default=0
     *          )
     *      ),
     *      @OA\Parameter(
     *          name="start",
     *          in="query",
     *          description="Start unix timestamp, must be less than end if present",
     *          required=false,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Parameter(
     *          name="end",
     *          in="query",
     *          description="End unix timestamp, must be greater than start if present",
     *          required=false,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Success",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="total", type="integer", example=240),
     *              @OA\Property(
     *                  property="records",
     *                  type="array",
     *                  @OA\Items(
     *                      type="object",
     *                      @OA\Property(property="ownership", type="number", format="float", example=0.009),
     *                      @OA\Property(property="volumeBeforeTransaction", type="integer", example=0),
     *                      @OA\Property(property="volumeAfterTransaction", type="integer", example=5000),
     *                      @OA\Property(
     *                          property="transactioner",
     *                          type="object",
     *                          @OA\Property(property="name", type="string", example="Lê Ngọc Hổ"),
     *                          @OA\Property(property="position", type="string", example="Em rể")
     *                      ),
     *                      @OA\Property(
     *                          property="related",
     *                          type="object",
     *                          @OA\Property(property="name", type="string", nullable=true),
     *                          @OA\Property(property="position", type="string", nullable=true)
     *                      ),
     *                      @OA\Property(
     *                          property="plan",
     *                          type="object",
     *                          @OA\Property(property="buyVolume", type="integer", example=0),
     *                          @OA\Property(property="sellVolume", type="integer", example=221100),
     *                          @OA\Property(property="beginDate", type="integer", example=1724086800000),
     *                          @OA\Property(property="endDate", type="integer", example=1726592400000)
     *                      ),
     *                      @OA\Property(
     *                          property="result",
     *                          type="object",
     *                          @OA\Property(property="buyVolume", type="integer", example=0),
     *                          @OA\Property(property="sellVolume", type="integer", example=221100),
     *                          @OA\Property(property="executionDate", type="integer", example=1725382800000)
     *                      )
     *                  )
     *              )
     *          )
     *       ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized",
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="No data found",
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
    public function InternalTransactionsAnnotation()
    {
    }
}
