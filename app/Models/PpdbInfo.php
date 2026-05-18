<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PpdbInfo extends Model
{
    protected $fillable = ['lembaga_id', 'description', 'contact_number', 'contact_name', 'contact_persons', 'registration_link', 'banner_url', 'is_active', 'is_open', 'is_link_active'];

    protected $casts = [
        'contact_persons' => 'array',
        'is_active'       => 'boolean',
        'is_open'         => 'boolean',
        'is_link_active'  => 'boolean',
    ];

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class);
    }
}
