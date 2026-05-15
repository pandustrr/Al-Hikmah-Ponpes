<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    protected $fillable = [
        'lembaga_id', 
        'judul', 
        'slug', 
        'konten', 
        'image_url', 
        'tanggal', 
        'status', 
        'category_id'
    ];

    public function category()
    {
        return $this->belongsTo(BeritaCategory::class, 'category_id');
    }

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class, 'lembaga_id');
    }
}
