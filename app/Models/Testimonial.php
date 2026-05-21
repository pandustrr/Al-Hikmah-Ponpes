<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $info
 * @property string $quote
 * @property string|null $image_url
 * @property int $stars
 * @property int $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial whereInfo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial whereQuote($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial whereStars($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Testimonial extends Model
{
    protected $fillable = ['name', 'info', 'quote', 'image_url', 'stars', 'is_active'];
}
