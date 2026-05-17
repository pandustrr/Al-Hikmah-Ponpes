<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fasilitas extends Model
{
    protected $fillable = ['lembaga_id', 'nama', 'kategori', 'deskripsi', 'image_url'];

    public function lembaga() {
        return $this->belongsTo(Lembaga::class);
    }

    public function galeris() {
        return $this->hasMany(Galeri::class);
    }
}
