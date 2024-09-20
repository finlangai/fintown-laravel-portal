<?php

namespace App\Utils;

use Illuminate\Http\JsonResponse;

class ApiResponse
{
    /**
     * Return a success response.
     *
     * @param mixed $data
     * @param int $statusCode
     * @return JsonResponse
     */
    public static function success($data = null, int $statusCode = 200): JsonResponse
    {
        return response()->json($data, $statusCode);
    }

    /**
     * Return an error response.
     *
     * @param string $message
     * @param int $statusCode
     * @param array $errors
     * @return JsonResponse
     */
    public static function error(string $message, int $statusCode = 400, array $errors = [  ]): JsonResponse
    {
        $response = [ 'message' => $message ];

        if (!empty($errors)) {
            $response[ 'errors' ] = $errors;
        }

        return response()->json($response, $statusCode);
    }

    /**
     * Return a not found response.
     *
     * @param string $message
     * @return JsonResponse
     */
    public static function badRequest(string $message = 'Bad requesst'): JsonResponse
    {
        return self::error($message);
    }

    /**
     * Return a not found response.
     *
     * @param string $message
     * @return JsonResponse
     */
    public static function notFound(string $message = 'Resource not found'): JsonResponse
    {
        return self::error($message, 404);
    }

    /**
     * Return an unauthorized response.
     *
     * @param string $message
     * @return JsonResponse
     */
    public static function unauthorized(string $message = 'Unauthorized'): JsonResponse
    {
        return self::error($message, 401);
    }

    /**
     * Return a forbidden response.
     *
     * @param string $message
     * @return JsonResponse
     */
    public static function forbidden(string $message = 'Forbidden'): JsonResponse
    {
        return self::error($message, 403);
    }

    /**
     * Return a validation error response.
     *
     * @param array $errors
     * @param string $message
     * @return JsonResponse
     */
    public static function validationError(array $errors, string $message = 'Validation failed'): JsonResponse
    {
        return self::error($message, 422, $errors);
    }

    /**
     * Return an internal server error response.
     *
     * @param string $message
     * @return JsonResponse
     */
    public static function internalServerError(string $message = 'Internal Server Error'): JsonResponse
    {
        return self::error($message, 500);
    }
}
