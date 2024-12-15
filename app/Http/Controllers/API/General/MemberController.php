<?php

namespace App\Http\Controllers\API\General;

use App\Http\Controllers\Controller;
use App\Models\Mongo\Other\CoreMember;
use App\Utils\ApiResponse;
use Illuminate\Support\Facades\DB;

class MemberController extends Controller
{
    public function __invoke()
    {
        $members = CoreMember::all();
        return ApiResponse::success($members);
    }
}
