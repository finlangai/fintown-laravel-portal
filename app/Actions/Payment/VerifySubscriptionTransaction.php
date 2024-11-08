<?php

namespace App\Actions\Payment;

use App\Enums\PaymentMethods;
use App\Services\Payments\MomoService;
use App\Services\Payments\VnPayService;
use Lorisleiva\Actions\Concerns\AsAction;

class VerifySubscriptionTransaction
{
    use AsAction;

    public function handle(array $data, string $provider): array|false
    {
        switch ($provider) {
            case PaymentMethods::MOMO->value:
                $paymentProviderService = MomoService::class;
                break;

            case PaymentMethods::VNPAY->value:
                $paymentProviderService = VnPayService::class;
                break;
        }

        list($sucess, $bill) = $paymentProviderService::queryTransaction($data);

        // normalize bill data
        $bill = $paymentProviderService::normalizeBill($bill);

        if (!$sucess) {
            $bill["failed"] = true;
        }

        return $bill;
    }
}
