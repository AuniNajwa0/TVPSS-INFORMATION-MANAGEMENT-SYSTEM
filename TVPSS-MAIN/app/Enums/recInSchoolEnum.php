<?php

namespace App\Enums;

enum recInSchoolEnum:String
{
    case Ada = "Ada";
    case Tiada = "Tiada";

    public static function getValues(): array
    { 
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
