<?php

namespace App\Enums;

enum TransactionStatus: string
{
    case FULFILLED = "fulfilled";
    case PROCESSING = "processing";
    case DECLINED = "declined";
    case ABORTED = "aborted";
}
