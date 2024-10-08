<?php

namespace App\Traits\Swagger\Symbols;

trait SearchAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/symbols/search",
     *      operationId="StockSearch",
     *      tags={"Symbols"},
     *      summary="Stock searching",
     *      description="Search for stock symbol base on given test",
     *      @OA\Parameter(
     *          description="The text to search for",
     *          in="query",
     *          name="q",
     *          @OA\Schema(type="string"),
     *          @OA\Examples(example="Query Example", value="Hòa", summary="Query Example"),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Success",
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="Not found",
     *       ),
     *      @OA\Response(
     *          response=422,
     *          description="Not enough parameters",
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal Server Error",
     *       ),
     *     )
     */
    public function SearchAnnotation()
    {
    }
}
