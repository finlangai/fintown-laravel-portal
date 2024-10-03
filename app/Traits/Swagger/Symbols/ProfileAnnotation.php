<?php

namespace App\Traits\Swagger\Symbols;

trait ProfileAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/symbols/{company}/profile",
     *      operationId="GetStockProfile",
     *      tags={"Symbols"},
     *      summary="Stock Profile",
     *      description="Retrieve the company's profile",
     *      @OA\Parameter(
     *          name="company",
     *          in="path",
     *          description="Company Symbol",
     *          required=true,
     *          @OA\Schema(type="string"),
     *          @OA\Examples(example="Vietcombank", value="VCB", summary="Vietcombank"),
     *          @OA\Examples(example="MB Bank", value="MBB", summary="MB Bank"),
     *          @OA\Examples(example="Vietnamilk", value="VNM", summary="Vietnamilk"),
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
     *          description="No found",
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal Server Error",
     *       ),
     * )
     */
    public function ProfileAnnotation()
    {
    }
}
