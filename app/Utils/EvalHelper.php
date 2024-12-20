<?php
namespace App\Utils;

class EvalHelper
{
    /**
     * Replace placeholders in the formula with actual values.
     *
     * @param string $formula The formula with placeholders.
     * @param array $params Associative array of parameters to replace in the formula.
     * @return string The formula with replaced values.
     */
    public static function replaceParams(string $formula, array $params): string
    {
        foreach ($params as $key => $value) {
            $formula = str_replace("{" . $key . "}", $value, $formula);
        }
        return $formula;
    }

    /**
     * Safely evaluate the given formula.
     *
     * @param string $formula The formula to evaluate.
     * @return float|int The result of the evaluation.
     * @throws \Exception If the formula is invalid.
     */
    public static function safeEval(string $formula)
    {
        try {
            return eval("return $formula;");
        } catch (\Throwable $th) {
            throw new \Exception("Invalid formula: $formula");
        }
    }
}
