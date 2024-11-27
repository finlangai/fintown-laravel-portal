<?php

namespace App\Actions\Payment;

use App\Enums\SubscriptionDurationType;
use App\Enums\SubscriptionStatus;
use App\Enums\TransactionStatus;
use App\Models\SQL\Payment\Transaction;
use App\Models\SQL\Subcription\Program;
use App\Models\SQL\Subcription\UserSubscription;
use App\Models\SQL\User\User;
use Carbon\Carbon;
use Lorisleiva\Actions\Concerns\AsAction;

class CreateSubscription
{
    use AsAction;

    public function handle(Transaction $currentTransaction, array $bill)
    {
        $transactionResult = [
            "amount" => $bill["amount"],
            "completion_time" => $bill["completion_time"],
            "status" => TransactionStatus::FULFILLED,
        ];

        // should have callbackUrl, programId
        $payload = $currentTransaction->payload;
        $programInfo = Program::find($payload["programId"]);

        // === SUBSCRIPTION DATA
        $user_id = $currentTransaction->user->id;
        $program_id = $programInfo->id;

        // transaction_id is no longer needed
        // $transaction_id = $currentTransaction->id;

        // THIS SHOULD BE CHANGE IN THE FUTURE, CHECKING IF THE PROVIDED SUBSCRIPTION PERIOD IS DUE
        $status = SubscriptionStatus::ACTIVE;
        list($start_date, $end_date) = $this->getSubscriptionPeriod(
            $programInfo->duration,
            $programInfo->duration_type
        );

        // DECLARE THE RESULT SUBSCRIPTION CREATION RESULT
        $callbackUrl = $payload["callbackUrl"];
        $isSucceed = true;
        try {
            // CREATE THE SUBSCRIPTION RECORD
            $subscription = UserSubscription::create(
                compact(
                    "user_id",
                    "program_id",
                    // "transaction_id",
                    "status",
                    "start_date",
                    "end_date"
                )
            );

            // ASSIGN PROFESSIONAL ROLE TO THE USER
            $currentTransaction->user->syncRoles(["professional"]);
        } catch (\Throwable $th) {
            // SET SUCCEED TO FALSE IF THE SUBSCRIPTION WITH THE SAME TRANSACTION_ID ALREADY EXISTS OR OTHER ERRORS OCCUR
            $isSucceed = false;
        }

        return [$isSucceed, $callbackUrl];
    }

    /**
     * get the startDate and endDate of the subscription program
     *
     * @param integer $duration
     * @param string $durationType
     * @return array
     */
    private function getSubscriptionPeriod(int $duration, string $durationType)
    {
        $startDate = Carbon::now();
        $endDate = $startDate->copy();

        switch ($durationType) {
            case SubscriptionDurationType::DAY->value:
                $endDate = $endDate->addDays($duration);
                break;
            case SubscriptionDurationType::MONTH->value:
                $endDate = $endDate->addMonths($duration);
                break;
            case SubscriptionDurationType::YEAR->value:
                $endDate = $endDate->addYears($duration);
                break;
        }
        return [$startDate, $endDate];
    }
}
