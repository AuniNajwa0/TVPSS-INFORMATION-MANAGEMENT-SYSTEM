<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Eloquent\Model as Model;
use App\Enums\StatusEnum;

class Equipment extends Model
{
    use HasFactory;

    protected $guarded = [
        'id',
    ];

    protected $fillable = [
        'name',
        'type',
        'location',
        'acquired_date',
        'status',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'status' => StatusEnum::class,  
    ];

    /**
     * A helper function to get the human-readable name of the status.
     */
    public function getStatusNameAttribute()
    {
        return ucfirst(str_replace('_', ' ', $this->status));
    }
}
