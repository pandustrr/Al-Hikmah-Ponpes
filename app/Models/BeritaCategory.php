<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Berita> $beritas
 * @property-read int|null $beritas_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BeritaCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BeritaCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BeritaCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BeritaCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BeritaCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BeritaCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BeritaCategory whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BeritaCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class BeritaCategory extends Model
{
    protected $fillable = ['name', 'slug'];

    public function beritas()
    {
        return $this->hasMany(Berita::class, 'category_id');
    }
}
