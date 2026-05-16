<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BeritaCategory extends Model
{
    protected $fillable = ['name', 'slug'];

    public function beritas()
    {
        return $this->hasMany(Berita::class, 'category_id');
    }
}
