<?php

namespace App\Traits\Swagger\Symbols;

trait AssessmentsCriteriaAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/symbols/{symbol}/assessment/criteria",
     *      operationId="GetCompanyAssessmentCriteria",
     *      tags={"Symbols"},
     *      summary="Financial Events",
     *      description="Retrieve assessment of a criteria for a company",
     *      @OA\Parameter(
     *          description="Symbol of the instrument",
     *          in="path",
     *          name="symbol",
     *          @OA\Schema(type="string"),
     *          @OA\Examples(example="Vietcombank", value="VCB", summary="Vietcombank"),
     *          @OA\Examples(example="MB Bank", value="MBB", summary="MB Bank"),
     *          @OA\Examples(example="Vietnamilk", value="VNM", summary="Vietnamilk"),
     *      ),
     *      @OA\Parameter(
     *          name="type",
     *          in="query",
     *          required=true,
     *          @OA\Schema(type="integer"),
     *          @OA\Examples(example="Profitability", value="1", summary="Hiệu quả sinh lời"),
     *          description="The Criteria type of the assessment"
     *      ),
     *      @OA\Parameter(
     *          name="group",
     *          in="query",
     *          required=false,
     *          @OA\Schema(type="integer"),
     *          description="Index of a specific group in a criteria"
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Success",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(
     *                  @OA\Property(property="assessment", type="string", example="- Tỷ lệ lợi nhuận"),
     *                  @OA\Property(property="status", type="string", example="Tiêu cực"),
     *                  @OA\Property(
     *                      property="metrics",
     *                      type="array",
     *                      @OA\Items(
     *                          @OA\Property(property="name", type="string", example="ROE"),
     *                          @OA\Property(property="isPercentage", type="boolean", example=true),
     *                          @OA\Property(property="unit", type="string", nullable=true, example=null),
     *                          @OA\Property(
     *                              property="historical",
     *                              type="array",
     *                              @OA\Items(
     *                                  @OA\Property(property="year", type="integer", example=2023),
     *                                  @OA\Property(property="value", type="number", format="float", example=8.36)
     *                              )
     *                          ),
     *                          @OA\Property(
     *                              property="forecast",
     *                              type="array",
     *                              @OA\Items(
     *                                  @OA\Property(property="year", type="integer", example=2024),
     *                                  @OA\Property(property="value", type="number", format="float", example=7.28)
     *                              )
     *                          )
     *                      )
     *                  ),
     *                  @OA\Property(property="title", type="string", example="Hiệu quả sinh lời dựa trên vốn")
     *              )
     *          ),
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized",
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="No resources found",
     *       ),
     *      @OA\Response(
     *          response=422,
     *          description="Insufficent parameters",
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal Server Error",
     *       ),
     * )
     */

    public function AssessmentsCriteriaAnnotation()
    {
    }
}
