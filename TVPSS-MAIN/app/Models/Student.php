<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model as Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'ic_num',
        'email',
        'crew',
        'state',
        'district',
        'schoolName',
        'school_info_id',
    ];

    /**
     * Relationship with the SchoolInfo model.
     * This links a student to their school.
     */
    public function schoolInfo()
    {
        return $this->belongsTo(SchoolInfo::class, 'school_info_id');
    }

    public function studcrew()
    {
        return $this->hasMany(Studcrew::class);
    }
}
