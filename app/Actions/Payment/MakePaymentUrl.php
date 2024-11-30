<?php

namespace App\Actions\Payment;

use App\Enums\PaymentMethods;
use App\Models\SQL\Payment\PaymentMethod;
use App\Models\SQL\Payment\Transaction;
use App\Services\Payments\MomoService;
use App\Models\SQL\Subcription\Program;
use App\Services\Payments\VnPayService;
use Lorisleiva\Actions\Concerns\AsAction;

class MakePaymentUrl
{
    use AsAction;

    public function handle(
        Program $program,
        PaymentMethod $paymentMethod,
        string $callbackUrl
    ) {
        // THE TRANSACT AMOUNT
        $amount = $program->price;
        $amount -= $amount * ($program->discount / 100);

        // CREATE NEW TRANSACTION RECORD
        $currentTransaction = Transaction::create([
            "user_id" => auth("api")->id(),
            "payment_method_id" => $paymentMethod->id,
            "amount" => $amount,
            "info" => "Thanh toán gói hội viên $program->name",
            "payload" => [
                "callbackUrl" => $callbackUrl,
                "programId" => $program->id,
            ],
        ]);

        // PAYMENT REQUEST PARAMETERS
        $amount = $program->price;
        $amount -= $amount * ($program->discount / 100);

        $orderInfo = $currentTransaction->info;
        $orderId = $currentTransaction->id;
        $returnUrl = route("payment.verify", $paymentMethod->name);

        $paymentRequestData = compact(
            "returnUrl",
            "orderId",
            "orderInfo",
            "amount"
        );

        switch ($paymentMethod->name) {
            case PaymentMethods::VNPAY->value:
                $paymentUrl = VnPayService::generateUrl(...$paymentRequestData);
                break;

            case PaymentMethods::MOMO->value:
                $paymentUrl = MomoService::generateUrl(...$paymentRequestData);
                break;
        }

        return $paymentUrl;
    }
}
