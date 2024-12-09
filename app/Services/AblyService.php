<?php

namespace App\Services;

use Ably\AblyRest;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\App;

class AblyService
{
    protected AblyRest $ably;

    public function __construct()
    {
        $this->ably = new AblyRest(env("ABLY_KEY"));
    }

    public function generateAuthToken(string $userId)
    {
        $tokenParams = ["clientId" => $userId];

        $tokenInfo = $this->ably->auth->requestToken($tokenParams);
        return response()->json($tokenInfo);
    }
}
