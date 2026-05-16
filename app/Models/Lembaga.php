<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lembaga extends Model
{
    protected $fillable = [
        'nama', 
        'slug', 
        'deskripsi', 
        'summary',
        'running_text',
        'visi', 
        'misi', 
        'struktur_pendidikan',
        'keunggulan',
        'image_url', 
        'ikon_url'
    ];

    public function prestasis()
    {
        return $this->hasMany(Prestasi::class);
    }

    public function kegiatans()
    {
        return $this->hasMany(Kegiatan::class);
    }
}
