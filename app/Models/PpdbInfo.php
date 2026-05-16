<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PpdbInfo extends Model
{
    protected $fillable = ['lembaga_id', 'description', 'contact_number', 'registration_link', 'banner_url', 'is_active'];

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class);
    }
}
