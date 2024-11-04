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

    /**
     * Get the path on the bucket for resources on firebase storage
     *
     * @param string $url
     * @return string
     */
    public static function getPathFromUrl(string $url): string
    {
        $parts = parse_url($url);
        if (!isset($parts["path"])) {
            throw new \InvalidArgumentException("Invalid URL");
        }

        // The path is in format /v0/b/bucket-name.appspot.com/o/encoded-file-path
        $pathParts = explode("/", $parts["path"]);
        $encodedPath = end($pathParts);

        return urldecode($encodedPath);
    }

    public static function removeNewLine(array $source)
    {
        array_walk_recursive($source, function (&$item) {
            if (is_string($item)) {
                $item = str_replace("\n", "", $item);
            }
        });

        return $source;
    }

    /**
     * flatten aggregation look up result
     *
     * @param [type] $array
     * @return void
     */
    public static function flattenLookUpAggregation($array)
    {
        $flattened = [];

        foreach ($array as $key => $value) {
            // Convert objects to arrays
            if (is_object($value)) {
                $value = (array) $value;
            }

            // Flatten single-element arrays that contain arrays
            if (
                is_array($value) &&
                count($value) === 1 &&
                is_array(reset($value))
            ) {
                $value = reset($value);
            }

            // Handle arrays with nested arrays or objects
            if (is_array($value)) {
                foreach ($value as $subKey => $subValue) {
                    if (is_object($subValue)) {
                        $subValue = (array) $subValue;
                    }
                    // Add nested values to flattened array
                    if (is_array($subValue)) {
                        foreach ($subValue as $nestedKey => $nestedValue) {
                            $flattened[$nestedKey] = $nestedValue;
                        }
                    } else {
                        $flattened[$subKey] = $subValue;
                    }
                }
            } else {
                $flattened[$key] = $value;
            }
        }

        return $flattened;
    }
}
