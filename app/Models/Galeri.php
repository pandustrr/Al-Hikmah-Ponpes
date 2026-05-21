<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $fasilitas_id
 * @property string|null $judul
 * @property string|null $deskripsi
 * @property string $image_url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Fasilitas $fasilitas
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Galeri newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Galeri newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Galeri query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Galeri whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Galeri whereDeskripsi($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Galeri whereFasilitasId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Galeri whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Galeri whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Galeri whereJudul($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Galeri whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Galeri extends Model
{
    protected $fillable = ['fasilitas_id', 'judul', 'deskripsi', 'image_url'];

    public function fasilitas()
    {
        return $this->belongsTo(Fasilitas::class);
    }
}
