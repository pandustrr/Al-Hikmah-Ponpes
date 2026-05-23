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

    /**
     * Normalize image_url to relative path.
     */
    public function getImageUrlAttribute($value): ?string
    {
        if (empty($value)) return null;
        if (str_starts_with($value, '/')) return $value;
        
        $parsed = parse_url($value);
        $host = $parsed['host'] ?? '';
        $localHosts = ['localhost', '127.0.0.1'];
        if (function_exists('request') && request()) {
            $localHosts[] = request()->getHost();
        }
        if ($host && !in_array($host, $localHosts)) {
            return $value;
        }
        
        return ($parsed['path'] ?? '/') .
               (isset($parsed['query']) ? '?' . $parsed['query'] : '');
    }

    public function fasilitas()
    {
        return $this->belongsTo(Fasilitas::class);
    }
}
