<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int|null $lembaga_id
 * @property string $judul
 * @property string $slug
 * @property string|null $ringkasan
 * @property string $konten
 * @property string|null $image_url
 * @property string|null $image_mobile_url
 * @property string|null $tanggal
 * @property string $status
 * @property int $views
 * @property int $is_sticky
 * @property int $is_multimedia
 * @property int|null $category_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\BeritaCategory|null $category
 * @property-read \App\Models\Lembaga|null $lembaga
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereImageMobileUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereIsMultimedia($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereIsSticky($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereJudul($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereKonten($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereLembagaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereRingkasan($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereTanggal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereViews($value)
 * @mixin \Eloquent
 */
class Berita extends Model
{
    protected $fillable = [
        'lembaga_id', 
        'judul', 
        'slug', 
        'konten', 
        'ringkasan',
        'image_url', 
        'image_mobile_url', 
        'tanggal', 
        'status', 
        'is_multimedia',
        'is_sticky',
        'views',
        'category_id'
    ];

    /**
     * Normalize image_url: strip any domain prefix so we always return a root-relative path.
     * This prevents ERR_NAME_NOT_RESOLVED when images were uploaded locally (APP_URL=http://localhost)
     * but are served from a different production domain.
     */
    public function getImageUrlAttribute($value): ?string
    {
        if (empty($value)) return null;
        if (str_starts_with($value, '/')) return $value;
        
        $parsed = parse_url($value);
        $path = $parsed['path'] ?? '';
        
        if (str_starts_with($path, '/storage/')) {
            return $path . (isset($parsed['query']) ? '?' . $parsed['query'] : '');
        }
        
        $host = $parsed['host'] ?? '';
        $localHosts = ['localhost', '127.0.0.1'];
        if (function_exists('request') && request()) {
            $localHosts[] = request()->getHost();
        }
        if ($host && !in_array($host, $localHosts)) {
            return $value;
        }
        
        return $path . (isset($parsed['query']) ? '?' . $parsed['query'] : '');
    }

    public function getImageMobileUrlAttribute($value): ?string
    {
        if (empty($value)) return null;
        if (str_starts_with($value, '/')) return $value;
        
        $parsed = parse_url($value);
        $path = $parsed['path'] ?? '';
        
        if (str_starts_with($path, '/storage/')) {
            return $path . (isset($parsed['query']) ? '?' . $parsed['query'] : '');
        }
        
        $host = $parsed['host'] ?? '';
        $localHosts = ['localhost', '127.0.0.1'];
        if (function_exists('request') && request()) {
            $localHosts[] = request()->getHost();
        }
        if ($host && !in_array($host, $localHosts)) {
            return $value;
        }
        
        return $path . (isset($parsed['query']) ? '?' . $parsed['query'] : '');
    }

    public function category()
    {
        return $this->belongsTo(BeritaCategory::class, 'category_id');
    }

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class, 'lembaga_id');
    }
}
