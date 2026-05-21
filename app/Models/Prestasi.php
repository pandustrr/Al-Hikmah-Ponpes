<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int|null $lembaga_id
 * @property string $judul
 * @property string $slug
 * @property string $konten
 * @property string|null $image_url
 * @property string|null $tanggal
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Lembaga|null $lembaga
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Prestasi newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Prestasi newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Prestasi query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Prestasi whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Prestasi whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Prestasi whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Prestasi whereJudul($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Prestasi whereKonten($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Prestasi whereLembagaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Prestasi whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Prestasi whereTanggal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Prestasi whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Prestasi extends Model
{
    protected $fillable = ['lembaga_id', 'judul', 'slug', 'konten', 'image_url', 'tanggal'];

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class);
    }
}
