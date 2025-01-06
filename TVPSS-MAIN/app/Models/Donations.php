<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Donations extends Model
{
    use HasFactory;

    protected $table = 'donation';

    protected $fillable = [
        'id',
        'name',
        'email',
        'phone',
        'ic_num',
        'amaun',
        'school_id',
    ];

    public function schoolInfo()
    {
        return $this->belongsTo(SchoolInfo::class, 'school_id', 'id');
    }
}
