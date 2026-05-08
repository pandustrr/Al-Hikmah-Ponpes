<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kegiatan extends Model
{
    protected $fillable = ['lembaga_id', 'judul', 'slug', 'deskripsi', 'image_url', 'tanggal'];

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class);
    }
}
