<?php

namespace App\Traits;

trait TransactionFromPaymentProvider
{
    public function getTransactionIdFromProvider(array $data)
    {
        $transactionId = "";
        if (array_key_exists("orderId", $data)) {
            $transactionId = $data["orderId"];
        }
        if (array_key_exists("vnp_TxnRef", $data)) {
            $transactionId = $data["vnp_TxnRef"];
        }

        return $transactionId;
    }
}
