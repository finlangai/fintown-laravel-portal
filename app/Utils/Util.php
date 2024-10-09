<?php

namespace App\Utils;

class Util
{
    /**
     * Turn a string to camel case
     *
     * @param string $string
     * @return string
     */
    public static function Camelize(string $string): string
    {
        return lcfirst(
            str_replace(" ", "", ucwords(str_replace("_", " ", $string)))
        );
    }

    /**
     * Turn all keys in an array into camel case
     *
     * @param array $source
     * @return array
     */
    public static function CamelizeArray(array $source): array
    {
        $arr = [];
        foreach ($source as $key => $value) {
            $key = self::Camelize($key);

            if (is_array($value)) {
                $value = self::CamelizeArray($value);
            }

            $arr[$key] = $value;
        }
        return $arr;
    }
}
