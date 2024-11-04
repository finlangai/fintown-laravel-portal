<?php

namespace App\Traits\Swagger\Symbols;

trait ProfileAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/symbols/{symbol}/profile",
     *      operationId="GetStockProfile",
     *      tags={"Symbols"},
     *      summary="Stock Profile",
     *      description="Retrieve the company's profile",
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
     *              @OA\Property(property="symbol", type="string", example="HPG"),
     *              @OA\Property(property="industry", type="string", example="Tài nguyên Cơ bản"),
     *              @OA\Property(property="logo", type="string", example="https://firebasestorage.googleapis.com/v0/b/fintown-4ddd6.appspot.com/o/logo%2FHPG.jpeg?alt=media"),
     *              @OA\Property(property="exchange", type="string", example="HOSE"),
     *              @OA\Property(property="overview", type="string", example="Hòa Phát được biết đến không chỉ là một tập đoàn kinh tế tư nhân đa nghành nghề..."),
     *              @OA\Property(property="marketCap", type="integer", example=169820),
     *              @OA\Property(property="listingVolume", type="integer", example=6396250200),
     *              @OA\Property(property="high", type="integer", example=26650),
     *              @OA\Property(property="low", type="integer", example=26100),
     *              @OA\Property(property="close", type="integer", example=26200),
     *              @OA\Property(property="tradingVolume", type="integer", example=26798500),
     *              @OA\Property(property="delta", type="number", format="float", example=-0.38),
     *              @OA\Property(property="eps", type="number", format="float", example=455.54),
     *              @OA\Property(property="pe", type="number", format="float", example=58.78),
     *              @OA\Property(property="pb", type="number", format="float", example=1.54),
     *              @OA\Property(property="roe", type="number", format="float", example=2.67),
     *              @OA\Property(property="roa", type="number", format="float", example=1.44),
     *              @OA\Property(property="isInWatchList", type="bool", example="false"),
     *          )
     *       ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized",
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="Not found",
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
