<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Galeri extends Model
{
    protected $fillable = ['fasilitas_id', 'judul', 'deskripsi', 'image_url'];

    public function fasilitas()
    {
        return $this->belongsTo(Fasilitas::class);
    }
}
