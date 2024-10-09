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
     *          description="The amount of transactions data to get. 20 by default",
     *          in="query",
     *          name="limit",
     *          @OA\Schema(type="int"),
     *          @OA\Examples(example="Limit", value="20", summary="20 transactions data"),
     *      ),
     *      @OA\Parameter(
     *          description="The amount of records to skip if specified, if offset is 3, skipping 3 transactions before actually taking data. Zero by default",
     *          in="query",
     *          name="offset",
     *          @OA\Schema(type="int"),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Success",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(
     *                  type="object",
     *                  @OA\Property(property="ownership", type="number", format="float", example=0.009),
     *                  @OA\Property(property="volumeBeforeTransaction", type="integer", example=0),
     *                  @OA\Property(property="volumeAfterTransaction", type="integer", example=5000),
     *                  @OA\Property(
     *                      property="transitioner",
     *                      type="object",
     *                      @OA\Property(property="name", type="string", example="Nguyễn Thị Kim Oanh"),
     *                      @OA\Property(property="position", type="string", example="Thành Viên HĐQT")
     *                  ),
     *                  @OA\Property(
     *                      property="related",
     *                      type="object",
     *                      @OA\Property(property="name", type="string", nullable=true),
     *                      @OA\Property(property="position", type="string", nullable=true)
     *                  ),
     *                  @OA\Property(
     *                      property="plan",
     *                      type="object",
     *                      @OA\Property(property="buyVolume", type="integer", example=10000),
     *                      @OA\Property(property="sellVolume", type="integer", example=0),
     *                      @OA\Property(property="beginDate", type="integer", example=1701277200000),
     *                      @OA\Property(property="endDate", type="integer", example=1703782800000)
     *                  ),
     *                  @OA\Property(
     *                      property="result",
     *                      type="object",
     *                      @OA\Property(property="buyVolume", type="integer", example=5000),
     *                      @OA\Property(property="sellVolume", type="integer", example=0),
     *                      @OA\Property(property="executionDate", type="integer", example=1703005200000)
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
