<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    protected $fillable = ['judul', 'slug', 'konten', 'image_url', 'tanggal', 'category_id'];

    public function category()
    {
        return $this->belongsTo(BeritaCategory::class, 'category_id');
    }
}
