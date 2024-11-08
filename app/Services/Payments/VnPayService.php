<?php
namespace App\Services\Payments;

use App\Models\SQL\Payment\Transaction;
use App\Traits\ExecPostRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;

class VnPayService
{
    use ExecPostRequest;

    public static function hashingSignature(string $rawHashData)
    {
        $vnp_HashSecret = env("VNPAY_HASH_SECRET");
        return hash_hmac("sha512", $rawHashData, $vnp_HashSecret);
    }

    public static function normalizeBill(array $bill)
    {
        $normalized = [
            "id" => $bill["vnp_TxnRef"],
            "amount" => $bill["vnp_Amount"],
        ];
        $normalized["completion_time"] = Carbon::createFromFormat(
            "YmdHis",
            $bill["vnp_PayDate"]
        );
        return $normalized;
    }

    public static function generateUrl(
        string $returnUrl,
        string $orderId,
        string $orderInfo,
        float $amount
    ) {
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

        $vnp_TmnCode = env("VNPAY_TMN_CODE"); //Mã website tại VNPAY
        $vnp_HashSecret = env("VNPAY_HASH_SECRET"); //Chuỗi bí mật

        // === INPUT PARAMETERS
        // Return URL with transaction info after payment complete
        $vnp_Returnurl = $returnUrl;
        //Order ID
        $vnp_TxnRef = $orderId;
        $vnp_OrderInfo = $orderInfo;
        $vnp_Amount = $amount * 100;

        $vnp_OrderType = 190004; //Thẻ học trực tuyến/thẻ hội viên
        $vnp_Locale = "VN";

        // $vnp_BankCode = "NCB";
        $vnp_IpAddr = $_SERVER["REMOTE_ADDR"];
        $inputData = [
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date("YmdHis"),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
        ];

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData["vnp_BankCode"] = $vnp_BankCode;
        }

        if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
            $inputData["vnp_Bill_State"] = $vnp_Bill_State;
        }

        //var_dump($inputData);
        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= "&" . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . "&";
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash = self::hashingSignature($hashdata); //
            $vnp_Url .= "vnp_SecureHash=" . $vnpSecureHash;
        }

        return $vnp_Url;
    }

    /**
     * THIS FUNCTION IS MALFUNCTIONING AND THE AUTHOR IS NOT BOTHER ON FIXING
     * DO NOT USE UNLESS YOU KNOW WHAT YOU ARE DOING
     *
     * -34 minutes later- okay it's ainnot malfunctioning any more, feel free to use
     *
     * this should ensure the consistence return format [$success, $jsonResult]
     *
     * @param string $orderId
     * @return void
     */
    public static function queryTransaction(array $data): array|false
    {
        $vnp_Url =
            "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";
        $vnp_TmnCode = env("VNPAY_TMN_CODE"); //Mã website tại VNPAY
        $vnp_HashSecret = env("VNPAY_HASH_SECRET"); //Chuỗi bí mật

        $vnp_TxnRef = $data["vnp_TxnRef"];

        // $vnp_BankCode = "NCB";
        $vnp_IpAddr = $_SERVER["REMOTE_ADDR"];
        $inputData = [
            "vnp_RequestId" => time() . uniqid(),
            "vnp_Version" => "2.1.0",
            "vnp_Command" => "querydr",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_TxnRef" => $vnp_TxnRef,
            "vnp_OrderInfo" => $data["vnp_OrderInfo"],
            "vnp_TransactionDate" => $data["vnp_PayDate"],
            "vnp_CreateDate" => date("YmdHis"),
            "vnp_IpAddr" => $vnp_IpAddr,
        ];

        $hashdata =
            $inputData["vnp_RequestId"] .
            "|" .
            $inputData["vnp_Version"] .
            "|" .
            $inputData["vnp_Command"] .
            "|" .
            $inputData["vnp_TmnCode"] .
            "|" .
            $inputData["vnp_TxnRef"] .
            "|" .
            $inputData["vnp_TransactionDate"] .
            "|" .
            $inputData["vnp_CreateDate"] .
            "|" .
            $inputData["vnp_IpAddr"] .
            "|" .
            $inputData["vnp_OrderInfo"];

        // $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash = self::hashingSignature($hashdata); //
            $inputData["vnp_SecureHash"] = $vnpSecureHash;
            // $vnp_Url .= "vnp_SecureHash=" . $vnpSecureHash;
        }

        $result = Http::post($vnp_Url, $inputData)->json();

        $success = true;
        // if not response code is not success
        $transactionStatus = $result["vnp_TransactionStatus"];
        if (!($transactionStatus == "00" || $transactionStatus == "07")) {
            $success = false;
        }

        return [$success, $result];
    }
}
