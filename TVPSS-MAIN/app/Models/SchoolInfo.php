<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class SchoolInfo extends Model
{
    use HasFactory;

    protected $table = 'schoolinfo';

    protected $fillable = [
        'schoolCode',
        'schoolName',
        'schoolEmail',
        'schoolAddress1',
        'schoolAddress2',
        'postcode',
        'state',
        'noPhone',
        'noFax',
        'schoolLogo',
        'linkYoutube',
    ];

    // point 2
    public function schoolVersion()
    {
        return $this->hasOne(TVPSSVersion::class, 'school_info_id');
    }

    public function updateLogo($file)
    {
        if ($file) {
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('logos', $filename, 'public');
            $this->update(['schoolLogo' => $filename]);
        }
    }

}
