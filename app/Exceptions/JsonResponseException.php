<?php
namespace App\Exceptions;

use App\Utils\ApiResponse;
use Exception;

class JsonResponseException extends Exception
{
    protected $message;

    public function __construct($message = "Bad Request")
    {
        parent::__construct($message);
    }

    public function render($request)
    {
        return ApiResponse::badRequest($this->message);
    }
}
