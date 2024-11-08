<?php

namespace App\Models\SQL\Subcription;

use App\Models\SQL\Payment\Transaction;
use App\Models\SQL\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsTo;

class UserSubscription extends Model
{
    use HasFactory;
    protected $table = "user_subscriptions";

    protected $fillable = [
        "user_id",
        "program_id",
        "transaction_id",
        "status",
        "start_date",
        "end_date",
    ];

    protected $casts = [
        "start_date" => "datetime",
        "end_date" => "datetime",
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class, "program_id");
    }

    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class, "transaction_id");
    }
}
