<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prestasi extends Model
{
    protected $fillable = ['lembaga_id', 'judul', 'slug', 'konten', 'image_url', 'tanggal'];

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class);
    }
}
