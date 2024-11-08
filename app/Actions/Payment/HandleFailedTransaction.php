<?php

namespace App\Actions\Payment;

use App\Models\SQL\Payment\Transaction;
use App\Traits\TransactionFromPaymentProvider;
use Lorisleiva\Actions\Concerns\AsAction;

class HandleFailedTransaction
{
    use AsAction;
    use TransactionFromPaymentProvider;

    public function handle(array $data)
    {
        // set the status to declined if exist
        try {
            $transactionId = $this->getTransactionIdFromProvider($data);
            $transaction = Transaction::findOrFail($transactionId);
            $transaction->status = "declined";
            $transaction->save();
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
