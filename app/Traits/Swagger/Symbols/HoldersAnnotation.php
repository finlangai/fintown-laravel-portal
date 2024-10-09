<?php

namespace App\Traits\Swagger\Symbols;

trait HoldersAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/symbols/{symbol}/holders",
     *      operationId="GetCompanyHolders",
     *      tags={"Symbols"},
     *      summary="Company Holders",
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
     *          description="The amount of holders data to get. 9 by default",
     *          in="query",
     *          name="limit",
     *          @OA\Schema(type="int"),
     *          @OA\Examples(example="Limit", value="9", summary="9 holders data"),
     *      ),
     *      @OA\Parameter(
     *          description="The amount of records to skip if specified, if offset is 3, skipping 3 holders before actually taking data. Zero by default",
     *          in="query",
     *          name="offset",
     *          @OA\Schema(type="int"),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Success",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="name", type="string", example="CTCP FPT"),
     *              @OA\Property(property="position", type="string", nullable=true),
     *              @OA\Property(property="shares", type="integer", example=43235549),
     *              @OA\Property(property="ownership", type="number", format="float", example=0.011657314000308807),
     *              @OA\Property(property="isOrganization", type="boolean", example=true),
     *              @OA\Property(property="isForeigner", type="boolean", example=false),
     *              @OA\Property(property="isFounder", type="boolean", example=false)
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
    public function HoldersAnnotation()
    {
    }
}
