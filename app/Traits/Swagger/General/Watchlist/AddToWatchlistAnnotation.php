<?php

namespace App\Traits\Swagger\General\Watchlist;

trait AddToWatchlistAnnotation
{
    /**
     * @OA\Post(
     *     path="/api/general/watchlist/add",
     *     summary="Add stock symbol to a watchlist",
     *     tags={"General","Watchlist"},
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="symbol",
     *                     type="string",
     *                     description="The stock symbol to remove from the watchlist",
     *                     example="VCB"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Stock symbol added successfully",
     *     ),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=422, description="Unprocessable Entity"),
     *     @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function AddToWatchlistAnnotation()
    {
    }
}
