<?php

namespace App\Models\SQL\Payment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory;
    protected $table = "payment_methods";

    protected $fillable = ["name"];

    public $timestamps = false;
}
