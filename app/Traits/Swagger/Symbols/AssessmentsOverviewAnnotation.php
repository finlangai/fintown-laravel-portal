<?php

namespace App\Traits\Swagger\Symbols;

trait AssessmentsOverviewAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/symbols/{symbol}/assessment/overview",
     *      operationId="GetCompanyAssessmentOverview",
     *      tags={"Symbols"},
     *      summary="Financial Events",
     *      description="Retrieve assessment overview of a company",
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
     *                  property="overall",
     *                  type="string",
     *                  example="- Công ty VCB đã thể hiện hiệu quả sinh lời tích cực trong giai đoạn 2013-2023..."
     *              ),
     *              @OA\Property(
     *                  property="criterias",
     *                  type="object",
     *                  @OA\Property(
     *                      property="profitability",
     *                      type="object",
     *                      @OA\Property(property="insight", type="string", example="- Công ty VCB đã thể hiện hiệu quả sinh lời..."),
     *                      @OA\Property(property="status", type="string", example="Tích cực"),
     *                      @OA\Property(
     *                          property="group",
     *                          type="array",
     *                          @OA\Items(
     *                              type="object",
     *                              @OA\Property(property="index", type="integer", example=0),
     *                              @OA\Property(property="name", type="string", example="Hiệu quả sinh lời dựa trên vốn"),
     *                              @OA\Property(property="status", type="string", example="Tích cực")
     *                          )
     *                      ),
     *                      @OA\Property(property="name", type="string", example="Hiệu quả sinh lời")
     *                  ),
     *                  @OA\Property(
     *                      property="solvency",
     *                      type="object",
     *                      @OA\Property(property="insight", type="string", example="- Khả năng thanh toán của công ty VCB được đánh giá tích cực..."),
     *                      @OA\Property(property="status", type="string", example="Tích cực"),
     *                      @OA\Property(
     *                          property="group",
     *                          type="array",
     *                          @OA\Items(
     *                              type="object",
     *                              @OA\Property(property="index", type="integer", example=0),
     *                              @OA\Property(property="name", type="string", example="Tính thanh khoản"),
     *                              @OA\Property(property="status", type="string", example="Tích cực")
     *                          )
     *                      ),
     *                      @OA\Property(property="name", type="string", example="Khả năng thanh toán")
     *                  ),
     *                  @OA\Property(
     *                      property="revenue_profit",
     *                      type="object",
     *                      @OA\Property(property="insight", type="string", example="- Doanh thi."),
     *                      @OA\Property(property="status", type="string", example="Tích cực"),
     *                      @OA\Property(
     *                          property="group",
     *                          type="array",
     *                          @OA\Items(
     *                              type="object",
     *                              @OA\Property(property="index", type="integer", example=0),
     *                              @OA\Property(property="name", type="string", example="Tăng trưởng doanh thu"),
     *                              @OA\Property(property="status", type="string", example="Tích cực")
     *                          )
     *                      ),
     *                      @OA\Property(property="name", type="string", example="Doanh thu và Lợi nhuận")
     *                  ),
     *                  @OA\Property(
     *                      property="cashflow",
     *                      type="object",
     *                      @OA\Property(property="insight", type="string", example="- Tăng trưởng dòn tư và phát triển của công ty trong tương lai."),
     *                      @OA\Property(property="status", type="string", example="Tiêu cực"),
     *                      @OA\Property(
     *                          property="group",
     *                          type="array",
     *                          @OA\Items(
     *                              type="object",
     *                              @OA\Property(property="index", type="integer", example=0),
     *                              @OA\Property(property="name", type="string", example="Tăng trưởng dòng tiền tự do"),
     *                              @OA\Property(property="status", type="string", example="Tiêu cực")
     *                          )
     *                      ),
     *                      @OA\Property(property="name", type="string", example="Dòng tiền")
     *                  ),
     *                  @OA\Property(
     *                      property="assets_equity",
     *                      type="object",
     *                      @OA\Property(property="insight", type="string", example="- Tỷ lệ tăng"),
     *                      @OA\Property(property="status", type="string", example="Tích cực"),
     *                      @OA\Property(
     *                          property="group",
     *                          type="array",
     *                          @OA\Items(
     *                              type="object",
     *                              @OA\Property(property="index", type="integer", example=0),
     *                              @OA\Property(property="name", type="string", example="Tỷ lệ tăng trưởng tài sản"),
     *                              @OA\Property(property="status", type="string", example="Tiêu cực")
     *                          )
     *                      ),
     *                      @OA\Property(property="name", type="string", example="Tài sản và Vốn chủ sở hữu")
     *                  )
     *              )
     *          ),
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized",
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="No events found",
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal Server Error",
     *       ),
     *     )
     */

    public function AssessmentsOverviewAnnotation()
    {
    }
}
