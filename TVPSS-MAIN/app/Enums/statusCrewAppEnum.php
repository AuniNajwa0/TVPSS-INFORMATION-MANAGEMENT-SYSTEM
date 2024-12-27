<?php

namespace App\Enums;

enum statusCrewAppEnum:String
{
    case Permohonan Diterima = "Permohonan Diterima";
    case Tidak_Berfungsi = "Tidak Berfungsi";
    case Penyelenggaraan = "Penyelenggaraan";

    public static function getValues(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
