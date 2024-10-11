<?php

namespace App\Actions;

use Carbon\Carbon;
use Lorisleiva\Actions\Concerns\AsAction;

class MapCompanySummary
{
    use AsAction;

    public function handle(array $info)
    {
        // Trim and remove special characters from all paragraph
        foreach ($info["summary"] as &$paragraph) {
            // trim and remove the special character to see if it's null
            $paragraph = trim(str_replace("  ", "", $paragraph));
            if (!$paragraph) {
                $paragraph = null;
                continue;
            }

            // split the paragraph by ';'
            $paragraph = explode(";", $paragraph);

            // loop through and reformat each chunk in the paragraph
            foreach ($paragraph as $index => &$chunk) {
                $chunk = trim($chunk);
                if (!$chunk) {
                    unset($paragraph[$index]);
                }
            }
        }

        // format the date for listingInfo
        $dateOfIssue = &$info["listingInfo"]["dateOfIssue"];
        $dateOfListing = &$info["listingInfo"]["dateOfListing"];

        $dateToParse = [&$dateOfIssue, &$dateOfListing];
        foreach ($dateToParse as &$dateString) {
            if (isset($dateString)) {
                $date = Carbon::parse($dateString);
                $dateString = $date->format("d-m-Y");
            }
        }

        return $info;
    }
}
