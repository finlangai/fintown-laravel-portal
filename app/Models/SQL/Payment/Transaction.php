<?php

namespace App\Models\SQL\Payment;

use App\Models\SQL\User\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;
    use HasUuids;

    protected $table = "transactions";
    protected $fillable = [
        "user_id",
        "payment_method_id",
        "info",
        "amount",
        "completion_time",
        "status",
        "payload",
    ];

    protected $casts = ["payload" => "array"];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function paymentMethod(): BelongsTo
    {
        return $this->belongsTo(PaymentMethod::class, "payment_method_id");
    }
}
