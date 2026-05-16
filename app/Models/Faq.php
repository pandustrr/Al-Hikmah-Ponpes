<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    protected $fillable = ['lembaga_id', 'question', 'answer', 'order', 'is_active'];

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class);
    }
}
