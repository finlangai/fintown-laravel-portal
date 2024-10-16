<?php

namespace App\Traits\Swagger\Tickers;

trait BestTickerAnnotation
{
    /**
     * @OA\Get(
     *     path="/api/tickers/best",
     *     operationId="GetBestTicker",
     *     tags={"Tickers"},
     *     summary="Get the best ticker by NPM",
     *     description="Retrieve data of the best ticker by NPM",
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="symbol", type="string", example="SHB"),
     *             @OA\Property(property="companyName", type="string", example="Ngân hàng Thương mại Cổ phần Sài Gòn – Hà Nội"),
     *             @OA\Property(property="logo", type="string", example="https://firebasestorage.googleapis.com/v0/b/fintown-4ddd6.appspot.com/o/logo%2FSHB.jpeg?alt=media"),
     *             @OA\Property(property="exchange", type="string", example="HOSE"),
     *             @OA\Property(property="assessment", type="string", example="Doanh thu của SHB tăng trưởng liên tục, đạt 57.589 tỷ đồng vào năm 2023. Lợi nhuận ròng đạt 7.325 tỷ đồng vào năm 2023, giảm nhẹ so với năm 2022. Biên lợi nhuận ròng giảm xuống còn 34,34% vào năm 2023."),
     *             @OA\Property(
     *                 property="historical",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="year", type="integer", example=2019),
     *                     @OA\Property(property="netProfit", type="number", format="float", example=2417.89),
     *                     @OA\Property(property="revenue", type="number", format="float", example=27682.7),
     *                     @OA\Property(property="npm", type="number", format="float", example=25.75)
     *                 )
     *             ),
     *             @OA\Property(property="netProfit", type="number", format="float", example=7324.76)
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error"
     *     )
     * )
     */
    public function BestTickerAnnotation()
    {
    }
}
