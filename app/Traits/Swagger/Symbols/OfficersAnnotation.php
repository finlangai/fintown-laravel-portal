<?php

namespace App\Traits\Swagger\Symbols;

trait OfficersAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/symbols/{symbol}/officers",
     *      operationId="GetCompanyOfficers",
     *      tags={"Symbols"},
     *      summary="Company Officers",
     *      description="Retrieve officers of a company",
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
     *          description="The amount of officers data to get. 9 by default",
     *          in="query",
     *          name="limit",
     *          @OA\Schema(type="int"),
     *          @OA\Examples(example="Limit", value="9", summary="9 officers data"),
     *      ),
     *      @OA\Parameter(
     *          description="The amount of records to skip if specified, if offset is 3, skipping 3 officers before actually taking data. Zero by default",
     *          in="query",
     *          name="offset",
     *          @OA\Schema(type="int"),
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
    public function OfficersAnnotation()
    {
    }
}
