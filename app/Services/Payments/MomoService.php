<?php
namespace App\Services\Payments;

use App\Models\SQL\Payment\Transaction;
use App\Traits\ExecPostRequest;
use Carbon\Carbon;

class MomoService
{
    use ExecPostRequest;

    public static function hashingSignature(string $rawHashData)
    {
        $secretKey = env("MOMO_SECRET_KEY");
        return hash_hmac("sha256", $rawHashData, $secretKey);
    }

    public static function normalizeBill(array $bill)
    {
        $normalized = [
            "id" => $bill["orderId"],
            "amount" => $bill["amount"],
        ];
        $normalized["completion_time"] = Carbon::now();
        return $normalized;
    }

    public static function generateUrl(
        string $returnUrl,
        string $orderId,
        string $orderInfo,
        string $amount
    ) {
        $endpoint =
            "https://test-payment.momo.vn/gw_payment/transactionProcessor";

        $partnerCode = env("MOMO_PARTNER_CODE");
        $accessKey = env("MOMO_ACCESS_KEY");

        // Lưu ý: link notifyUrl không phải là dạng localhost
        $bankCode = "SML";
        $notifyurl = "https://blank.page";

        $requestId = time() . "";
        $requestType = "payWithMoMoATM";
        $extraData = "";

        // echo $serectkey;die;
        $rawHash =
            "partnerCode=" .
            $partnerCode .
            "&accessKey=" .
            $accessKey .
            "&requestId=" .
            $requestId .
            "&bankCode=" .
            $bankCode .
            "&amount=" .
            $amount .
            "&orderId=" .
            $orderId .
            "&orderInfo=" .
            $orderInfo .
            "&returnUrl=" .
            $returnUrl .
            "&notifyUrl=" .
            $notifyurl .
            "&extraData=" .
            $extraData .
            "&requestType=" .
            $requestType;

        $signature = self::hashingSignature($rawHash);

        $data = [
            "partnerCode" => $partnerCode,
            "accessKey" => $accessKey,
            "requestId" => $requestId,
            "amount" => $amount,
            "orderId" => $orderId,
            "orderInfo" => $orderInfo,
            "returnUrl" => $returnUrl,
            "bankCode" => $bankCode,
            "notifyUrl" => $notifyurl,
            "extraData" => $extraData,
            "requestType" => $requestType,
            "signature" => $signature,
        ];
        $result = self::execPostRequest($endpoint, json_encode($data));
        $jsonResult = json_decode($result, true); // decode json

        return $jsonResult["payUrl"];
    }

    /**
     * THIS ONE WORKS NICE, NOT MALFUNCTION LIKE VNPAY QUERY BUT NOT USING
     * this should ensure the consistence return format [$success, $jsonResult]
     *
     * @param string $orderId
     * @return void
     */
    public static function queryTransaction(array $data): array|false
    {
        $endpoint =
            "https://test-payment.momo.vn/gw_payment/transactionProcessor";
        $partnerCode = env("MOMO_PARTNER_CODE");
        $accessKey = env("MOMO_ACCESS_KEY");
        $secretKey = env("MOMO_SECRET_KEY");
        $requestId = time() . "";
        $requestType = "transactionStatus";

        $orderId = $data["orderId"];

        //before sign HMAC SHA256 signature
        $rawHash =
            "partnerCode=" .
            $partnerCode .
            "&accessKey=" .
            $accessKey .
            "&requestId=" .
            $requestId .
            "&orderId=" .
            $orderId .
            "&requestType=" .
            $requestType;

        $signature = hash_hmac("sha256", $rawHash, $secretKey);

        $data = [
            "partnerCode" => $partnerCode,
            "accessKey" => $accessKey,
            "requestId" => $requestId,
            "orderId" => $orderId,
            "requestType" => $requestType,
            "signature" => $signature,
        ];
        $result = self::execPostRequest($endpoint, json_encode($data));
        $jsonResult = json_decode($result, true); // decode json

        $success = true;
        // false if not success code
        if (!$jsonResult["errorCode"] == 0) {
            $success = false;
        }

        return [$success, $jsonResult];
    }
}
