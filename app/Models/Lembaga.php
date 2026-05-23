<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $nama
 * @property string $slug
 * @property string|null $deskripsi
 * @property string|null $summary
 * @property string|null $running_text
 * @property string|null $jumlah_siswa
 * @property string|null $jumlah_pengajar
 * @property string|null $jumlah_fasilitas
 * @property string|null $akreditasi
 * @property string|null $program_tags
 * @property string|null $visi
 * @property string|null $misi
 * @property string|null $struktur_pendidikan
 * @property string|null $keunggulan
 * @property string|null $image_url
 * @property string|null $image_mobile_url
 * @property string|null $ikon_url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Kegiatan> $kegiatans
 * @property-read int|null $kegiatans_count
 * @property-read \App\Models\PpdbInfo|null $ppdbInfo
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Prestasi> $prestasis
 * @property-read int|null $prestasis_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereAkreditasi($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereDeskripsi($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereIkonUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereImageMobileUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereJumlahFasilitas($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereJumlahPengajar($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereJumlahSiswa($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereKeunggulan($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereMisi($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereNama($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereProgramTags($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereRunningText($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereStrukturPendidikan($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Lembaga whereVisi($value)
 * @mixin \Eloquent
 */
class Lembaga extends Model
{
    protected $fillable = [
        'nama', 
        'slug', 
        'deskripsi', 
        'summary',
        'running_text',
        'jumlah_siswa',
        'jumlah_pengajar',
        'jumlah_fasilitas',
        'akreditasi',
        'program_tags',
        'visi', 
        'misi', 
        'struktur_pendidikan',
        'keunggulan',
        'image_url', 
        'image_mobile_url',
        'ikon_url',
        'profil_image_url',
        'profil_image_mobile_url',
        'filosofi_tagline',
        'filosofi_title',
        'sidebar_category_id',
        'sidebar_berita_id',
        'sidebar_categories',
        'youtube_video_badge',
        'youtube_video_title',
        'youtube_video_desc',
        'youtube_video_urls',
    ];

    protected $casts = [
        'sidebar_categories' => 'array',
        'youtube_video_urls' => 'array',
    ];

    /**
     * Normalize image URL to always be root-relative (no domain prefix).
     */
    private function normalizeImageUrl(?string $value): ?string
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

    public function getImageUrlAttribute($value): ?string
    {
        return $this->normalizeImageUrl($value);
    }

    public function getImageMobileUrlAttribute($value): ?string
    {
        return $this->normalizeImageUrl($value);
    }

    public function getIkonUrlAttribute($value): ?string
    {
        return $this->normalizeImageUrl($value);
    }

    public function getProfilImageUrlAttribute($value): ?string
    {
        return $this->normalizeImageUrl($value);
    }

    public function getProfilImageMobileUrlAttribute($value): ?string
    {
        return $this->normalizeImageUrl($value);
    }

    public function prestasis()
    {
        return $this->hasMany(Prestasi::class);
    }

    public function kegiatans()
    {
        return $this->hasMany(Kegiatan::class);
    }

    public function ppdbInfo()
    {
        return $this->hasOne(PpdbInfo::class);
    }
}
