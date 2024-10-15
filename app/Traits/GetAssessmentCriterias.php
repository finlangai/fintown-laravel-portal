<?php

namespace App\Traits;

use App\Models\Mongo\System\Criteria;

trait GetAssessmentCriterias
{
    public function getAssessmentCriterias()
    {
        return Criteria::orderBy("id", "asc")->get();
    }
}
