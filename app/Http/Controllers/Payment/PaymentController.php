<?php

namespace App\Http\Controllers\Payment;

use App\Actions\Payment\GenerateMoMoUrl;
use App\Actions\Payment\GenerateVNPayURL;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function info(Request $request)
    {
        dd($request->all());
    }

    public function vnpay(Request $request, GenerateVNPayURL $generateVnPayUrl)
    {
        $data = $request->all();

        $vnp_Url = $generateVnPayUrl->handle($data);

        return Inertia::location($vnp_Url);
    }

    public function momo(Request $request, GenerateMoMoUrl $generateMoMoUrl)
    {
        $data = $request->all();

        $momoPayUrl = $generateMoMoUrl->handle($data);

        return Inertia::location($momoPayUrl);
    }
}
