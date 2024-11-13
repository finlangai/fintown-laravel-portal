<?php

namespace App\Enums;

enum StockValuationMethods: string
{
    case DISCOUNTED_CASH_FLOW = "discounted-cash-flow";
    case GRAHAM_INTRINSIC_VALUE = "graham-intrinsic-value-formula";
    case PRICE_TO_EARNING_RELATIVE = "price-to-earnings-relative-valuation";
    case PRICE_TO_BOOK_RELATIVE = "price-to-book-relative-valuation";
}
