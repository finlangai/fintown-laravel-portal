<?php

namespace App\Http\Controllers\API\General;

use App\Http\Controllers\Controller;
use App\Models\Mongo\Faq;
use App\Utils\ApiResponse;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function __invoke()
    {
        $result = Faq::all();
        return ApiResponse::success($result);
    }
}
