<?php

namespace App\Enums;

enum StatementType: int {
    case balance_sheet     = 1;
    case income_statement  = 2;
    case cashflow_direct   = 3;
    case cashflow_indirect = 4;
}
