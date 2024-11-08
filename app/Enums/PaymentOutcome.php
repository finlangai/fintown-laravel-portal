<?php

namespace App\Enums;

enum PaymentOutcome
{
    case REGISTRATION_SUCCESS;
    case REGISTRATION_FAILED;
    case RENEWAL_SUCCESS;
    case RENEWAL_FAILED;
}
