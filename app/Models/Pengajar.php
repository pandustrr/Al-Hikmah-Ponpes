<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $lembaga_id
 * @property string $nama
 * @property string $jabatan
 * @property string|null $image_url
 * @property int $urutan
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Lembaga $lembaga
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Pengajar newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Pengajar newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Pengajar query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Pengajar whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Pengajar whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Pengajar whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Pengajar whereJabatan($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Pengajar whereLembagaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Pengajar whereNama($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Pengajar whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Pengajar whereUrutan($value)
 * @mixin \Eloquent
 */
class Pengajar extends Model
{
    protected $fillable = [
        'lembaga_id',
        'nama',
        'jabatan',
        'image_url',
        'urutan'
    ];

    /**
     * Normalize image_url to relative path.
     */
    public function getImageUrlAttribute($value): ?string
    {
        if (empty($value)) return null;
        if (str_starts_with($value, '/')) return $value;
        $parsed = parse_url($value);
        return ($parsed['path'] ?? '/') .
               (isset($parsed['query']) ? '?' . $parsed['query'] : '');
    }

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class);
    }
}
