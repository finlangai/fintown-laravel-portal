<?php

namespace App\Exceptions;

use App\Utils\ApiResponse;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
     ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
     ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
     ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->renderable(function (Throwable $e, $request) {
            if ($request->is('api/*') || $request->wantsJson()) {
                return $this->handleApiException($e, $request);
            }
        });
    }

    /**
     * Handle API exceptions
     */
    private function handleApiException(Throwable $e, $request)
    {
        if ($e instanceof ValidationException) {
            return ApiResponse::validationError($e->errors(), 'The given data was invalid.');
        }

        if ($e instanceof ModelNotFoundException) {
            return ApiResponse::notFound('Resource not found.');
        }

        if ($e instanceof NotFoundHttpException) {
            return ApiResponse::notFound('The requested resource was not found.');
        }

        if ($e instanceof MethodNotAllowedHttpException) {
            return ApiResponse::error('The specified method for the request is invalid.', 405);
        }

        if ($e instanceof AuthenticationException) {
            return ApiResponse::unauthorized('Unauthenticated.');
        }

        // Log the exception
        // $this->report($e);

        // Return a generic error message to avoid exposing sensitive information
        return ApiResponse::internalServerError('An unexpected error occurred.');
    }
}
