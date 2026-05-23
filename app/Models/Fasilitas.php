<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int|null $lembaga_id
 * @property string $nama
 * @property string|null $kategori
 * @property string|null $deskripsi
 * @property string|null $image_url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Galeri> $galeris
 * @property-read int|null $galeris_count
 * @property-read \App\Models\Lembaga|null $lembaga
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Fasilitas newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Fasilitas newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Fasilitas query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Fasilitas whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Fasilitas whereDeskripsi($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Fasilitas whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Fasilitas whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Fasilitas whereKategori($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Fasilitas whereLembagaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Fasilitas whereNama($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Fasilitas whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Fasilitas extends Model
{
    protected $fillable = ['lembaga_id', 'nama', 'kategori', 'deskripsi', 'image_url'];

    /**
     * Normalize image_url: strip any domain prefix so we always return a root-relative path.
     */
    public function getImageUrlAttribute($value): ?string
    {
        if (empty($value)) return null;
        if (str_starts_with($value, '/')) return $value;
        $parsed = parse_url($value);
        return ($parsed['path'] ?? '/') .
               (isset($parsed['query']) ? '?' . $parsed['query'] : '');
    }

    public function lembaga() {
        return $this->belongsTo(Lembaga::class);
    }

    public function galeris() {
        return $this->hasMany(Galeri::class);
    }
}
