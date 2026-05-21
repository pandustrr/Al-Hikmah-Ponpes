<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string $date
 * @property string|null $lembaga
 * @property string|null $lokasi
 * @property string|null $image_url
 * @property int $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereLembaga($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereLokasi($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Event extends Model
{
    protected $fillable = ['title', 'date', 'lembaga', 'lokasi', 'image_url', 'is_active'];
}
