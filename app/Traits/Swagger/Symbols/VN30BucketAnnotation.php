<?php

namespace App\Traits\Swagger\Symbols;

trait VN30BucketAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/symbols/vn30",
     *      operationId="Vn30Stocks",
     *      tags={"Symbols"},
     *      summary="VN30 Stocks list",
     *      description="Get the VN30 stocklist",
     *      @OA\Response(
     *          response=200,
     *          description="Success",
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal error",
     *       ),
     *     )
     */
    public function VN30BucketAnnotation()
    {
    }
}
