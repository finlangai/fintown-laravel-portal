<?php

namespace App\Services;

use App\Utils\Logger;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

class PythonService
{
    protected string $pythonServiceUrl;
    public function __construct()
    {
        $this->pythonServiceUrl = env("PYTHON_SERVICE_URL");
    }

    /**
     * Craft the url by concating the Python Service URL with the passed in endpoint
     *
     * @param string $endpoint
     * @return string
     */
    public function craftUrl(string $endpoint): string
    {
        return $this->pythonServiceUrl . "/" . $endpoint;
    }

    /**
     * Make POST request to an endpoint and end the connect instantly.
     * Specifically made for sending request to SSE endpoint but do not need messages from the SSE
     *
     * @param string $endpoint
     * @return Illuminate\Http\Client\Response
     */
    public function instantPOST(string $endpoint): Response
    {
        try {
            $response = Http::timeout(1)->post($this->craftUrl($endpoint));
            return $response;
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function POST(string $endpoint)
    {
        try {
            return Http::post($this->craftUrl($endpoint));
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
