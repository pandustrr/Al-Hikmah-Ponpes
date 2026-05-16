<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengajar extends Model
{
    protected $fillable = [
        'lembaga_id',
        'nama',
        'jabatan',
        'image_url',
        'urutan'
    ];

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class);
    }
}
