<?php

namespace App\Enums;

enum StockValuationMethods: string
{
    case DISCOUNTED_CASH_FLOW = "discounted-cash-flow";
    case DIVIDEND_DISCOUNT = "dividend-discount-model";
    case GRAHAM_INTRINSIC_VALUE = "graham-intrinsic-value-formula";
    case PRICE_TO_EARNING_RELATIVE = "price-to-earnings-relative-valuation";
    case PRICE_TO_BOOK_RELATIVE = "price-to-book-relative-valuation";
    case CAPITAL_ASSET_PRICING = "capital-asset-pricing-model";
    case PRICE_EARNINGS_TO_GROWTH = "price-earnings-to-growth-ratio";
}
