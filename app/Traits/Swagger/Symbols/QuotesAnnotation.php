<?php

namespace App\Traits\Swagger\Symbols;

trait QuotesAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/symbols/{company}/quotes?start=1709251200&end=1727740800&interval=1D&limit=90",
     *      operationId="GetStockQuotes",
     *      tags={"Symbols"},
     *      summary="Stock Quotes",
     *      description="Retrieve the stock price of a company with OHLC and Volume within the quote",
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
     *      @OA\Parameter(
     *          name="start",
     *          in="query",
     *          description="Start unix timestamp (must be less than end)",
     *          required=true,
     *          @OA\Schema(type="integer", format="int64"),
     *          @OA\Examples(example="2024-03-01", value="1709251200", summary="2024-03-01"),
     *      ),
     *      @OA\Parameter(
     *          name="end",
     *          in="query",
     *          description="End unix timestamp (must be greater than start)",
     *          required=true,
     *          @OA\Schema(type="integer", format="int64"),
     *          @OA\Examples(example="2024-10-01", value="1727740800", summary="2024-10-01"),
     *      ),
     *      @OA\Parameter(
     *          name="interval",
     *          in="query",
     *          description="Interval (must be one of [1m, 1H, 1D, 1W, 1M])",
     *          required=true,
     *          @OA\Schema(type="string", enum={"1m", "1H", "1D", "1W", "1M"}),
     *          @OA\Examples(example="Daily", value="1D", summary="Daily"),
     *      ),
     *      @OA\Parameter(
     *          name="type",
     *          in="query",
     *          description="The type of quote to return",
     *          required=true,
     *          @OA\Schema(type="string", enum={1,2}),
     *          @OA\Examples(example="Full", value="1", summary="OHLC with Volume and Time"),
     *          @OA\Examples(example="Minimal", value="2", summary="Only Time and Closing price"),
     *      ),
     *      @OA\Parameter(
     *          name="limit",
     *          in="query",
     *          description="Limit (must be an integer greater than 1)",
     *          required=false,
     *          @OA\Schema(type="integer", minimum=1),
     *          @OA\Examples(example="(90 Quotes)", value="90", summary="90 Quotes"),
     *      ),
     *      @OA\Parameter(
     *          name="offset",
     *          in="query",
     *          description="The offset of the data, if offset is 30, skip through 30 records before actually taking the records",
     *          required=false,
     *          @OA\Schema(type="integer", minimum=1)
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
     *          description="No records found",
     *       ),
     *      @OA\Response(
     *          response=422,
     *          description="Insufficient parameters",
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal Server Error",
     *       ),
     * )
     */
    public function QuotesAnnotation()
    {
    }
}
