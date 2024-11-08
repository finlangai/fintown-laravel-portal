<?php

namespace App\Enums;

enum SubscriptionStatus: string
{
    case IMMINENT = "imminent";
    case ACTIVE = "active";
    case EXPIRED = "expired";
    case CANCELLED = "cancelled";
}
