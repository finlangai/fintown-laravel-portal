<?php

namespace App\Http\Controllers\Payment;

use App\Actions\CheckPromotionCode;
use App\Actions\Payment\CreateSubscription;
use App\Actions\Payment\HandleFailedTransaction;
use App\Actions\Payment\MakePaymentUrl;
use App\Actions\Payment\VerifySubscriptionTransaction;
use App\Enums\PaymentMethods;
use App\Enums\PaymentOutcome;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\CheckPromotionCodeRequest;
use App\Http\Requests\Payment\PaymentEntryRequest;
use App\Models\SQL\Payment\PaymentMethod;
use App\Models\SQL\Payment\Transaction;
use App\Models\SQL\Subcription\Program;
use App\Models\SQL\Subcription\PromotionCode;
use App\Traits\Swagger\Payment\CheckPromotionCodeAnnotation;
use App\Traits\Swagger\Payment\InitiateSubscriptionRegistrationAnnotation;
use App\Utils\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    use InitiateSubscriptionRegistrationAnnotation;
    public function initiateSubscriptionRegistration(
        PaymentEntryRequest $request,
        MakePaymentUrl $makePaymentUrl
    ) {
        // CHECKING SUBSCRIPTION PROGRAM
        $programId = $request->input("programId");
        try {
            $program = Program::findOrFail(strtoupper($programId));
        } catch (\Throwable $th) {
            return ApiResponse::notFound("Không tìm thấy gói đăng ký.");
        }

        if ($promotionCode = $request->input("promotionCode")) {
            // checking the promotion on the server
            $checkPromotionResult = (new CheckPromotionCode())->handle([
                "code" => $promotionCode,
                "programId" => $programId,
            ]);

            // === THE PROMOTION IS VALID FROM HERE
            // change the discount of the subscriptions
            $program->discount = $checkPromotionResult["discountPercent"];
        }

        // CHECKING PAYMENT METHOD
        $paymentMethodName = $request->input("paymentMethod");
        try {
            $paymentMethod = PaymentMethod::where(
                "name",
                $paymentMethodName
            )->firstOrFail();
        } catch (\Throwable $th) {
            return ApiResponse::notFound(
                "Phương thức thanh toán không hợp lệ."
            );
        }

        // ====== PROCESS THE ORDER
        $callbackUrl = $request->input("callbackUrl");
        $paymentUrl = $makePaymentUrl->handle(
            $program,
            $paymentMethod,
            $callbackUrl
        );

        return ApiResponse::success(compact("paymentUrl"));
    }

    use CheckPromotionCodeAnnotation;
    public function checkPromotionCode(
        CheckPromotionCodeRequest $request,
        CheckPromotionCode $action
    ) {
        $validated = $request->validated();
        $result = $action->handle($validated);

        return ApiResponse::success($result);
    }

    public function verify(
        Request $request,
        string $provider,
        VerifySubscriptionTransaction $verifyTransaction,
        CreateSubscription $createSubscription,
        HandleFailedTransaction $handleFailedTransaction
    ) {
        if (!PaymentMethods::tryFrom($provider)) {
            return ApiResponse::badRequest();
        }
        $data = $request->all();

        $verifyResult = $verifyTransaction->handle($data, $provider);

        try {
            $currentTransaction = Transaction::with("user")->findOrFail(
                $verifyResult["id"]
            );
        } catch (\Throwable $th) {
            // tell these forking hackers to get out harshly
            return "GET OUT";
        }

        // === DECLARE  CALLBACK AND ITS SUFFIXES
        $callbackUrl = $currentTransaction->payload["callbackUrl"];
        $cbSucceedSuffix =
            "?outcome=" . PaymentOutcome::REGISTRATION_SUCCESS->name;
        $cbFailedSuffix =
            "?outcome=" . PaymentOutcome::REGISTRATION_FAILED->name;

        //  === HANDLE FAILED TRANSACTION
        // failed field gonna present if it is a declied transaction
        if (array_key_exists("failed", $verifyResult)) {
            $handleFailedTransaction->handle($data);
            // REDIRECT AS FAILED
            return redirect($callbackUrl . $cbFailedSuffix);
        }

        // === HANDLE SUBSCRIPTION CREATING LOGIC
        list($isSucceed, $callbackUrl) = $createSubscription->handle(
            $currentTransaction,
            $verifyResult
        );

        // CHECK IF SUCCEED
        if (!$isSucceed) {
            // LOGIC IF SUBSCRIPTION CREATION PROCESS FAIL
            // REDIRECT AS FAILED
            return redirect($callbackUrl . $cbFailedSuffix);
        }

        // REDIRECT AS SUCCESS
        return redirect($callbackUrl . $cbSucceedSuffix);
    }

    public function test()
    {
        return Inertia::render("Test");
    }
}
