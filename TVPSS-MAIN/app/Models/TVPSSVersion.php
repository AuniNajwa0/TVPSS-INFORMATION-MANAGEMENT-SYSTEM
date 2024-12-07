<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Eloquent\Model as Model;
use App\Enums\greenScreenEnum;
use App\Enums\recordEquipmentEnum;
use App\Enums\noPhoneEnum;

class TVPSSVersion extends Model
{
    use HasFactory;

    protected $table = 'schoolversion';

    protected $guarded = [
        'id',
    ];

    protected $fillable = [
        'version',
        'agency1_name',
        'agency2_name',
        'agencyManager1_name',
        'agencyManager2_name',
        'noPhone',
        'recordEquipment',
        'greenScreen',
    ];

    protected $casts = [
        'recordEquipment' => recordEquipmentEnum::class,  
        'greenScreen' => greenScreenEnum::class,
        'noPhone' => noPhoneEnum::class,
    ];

    public function schoolInfo()
    {
        return $this->belongsTo(SchoolInfo::class, 'school_info_id');
    }

    public function logo()
    {
        return $this->schoolInfo->schoolLogo ?? null;
    }


}
