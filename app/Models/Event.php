<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['title', 'date', 'lembaga', 'lokasi', 'image_url', 'is_active'];
}
