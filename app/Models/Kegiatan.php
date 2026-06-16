<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int|null $lembaga_id
 * @property string $judul
 * @property string $slug
 * @property string $deskripsi
 * @property string|null $image_url
 * @property string|null $tanggal
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Lembaga|null $lembaga
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Kegiatan newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Kegiatan newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Kegiatan query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Kegiatan whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Kegiatan whereDeskripsi($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Kegiatan whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Kegiatan whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Kegiatan whereJudul($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Kegiatan whereLembagaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Kegiatan whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Kegiatan whereTanggal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Kegiatan whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Kegiatan extends Model
{
    protected $fillable = ['lembaga_id', 'judul', 'slug', 'deskripsi', 'image_url', 'tanggal'];

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class);
    }

    public function galeris()
    {
        return $this->hasMany(KegiatanGaleri::class, 'kegiatan_id');
    }
}
