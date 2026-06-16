<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KegiatanGaleri extends Model
{
    protected $table = 'kegiatan_galeris';

    protected $fillable = ['kegiatan_id', 'judul', 'deskripsi', 'image_url'];

    /**
     * Normalize image_url to relative path.
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

    public function kegiatan()
    {
        return $this->belongsTo(Kegiatan::class);
    }
}
