<?php

namespace App\Enums;

enum PaymentMethods: string
{
    case VNPAY = "vnpay";
    case MOMO = "momo";
}
