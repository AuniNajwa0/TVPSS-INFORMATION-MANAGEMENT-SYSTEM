<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    const SUPER_ADMIN = 0;
    const STATE_ADMIN = 1;
    const PPD_ADMIN = 2;
    const SCHOOL_ADMIN = 3;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getRoleName(): string
    {
        switch ($this->role) {
            case self::SUPER_ADMIN:
                return 'super_admin';
            case self::STATE_ADMIN:
                return 'state_admin';
            case self::PPD_ADMIN:
                return 'ppd_admin';
            case self::SCHOOL_ADMIN:
                return 'school_admin';
            default:
                return 'unknown';
        }
    }
    
}
