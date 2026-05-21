<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $key
 * @property string|null $value
 * @property string $group
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LandingSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LandingSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LandingSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LandingSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LandingSetting whereGroup($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LandingSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LandingSetting whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LandingSetting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LandingSetting whereValue($value)
 * @mixin \Eloquent
 */
class LandingSetting extends Model
{
    protected $fillable = ['key', 'value', 'group'];
}
