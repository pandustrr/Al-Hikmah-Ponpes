<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = ['name', 'info', 'quote', 'image_url', 'stars', 'is_active'];
}
