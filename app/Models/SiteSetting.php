<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $key
 * @property string $label
 * @property string|null $value
 * @property string $group
 * @property string $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SiteSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SiteSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SiteSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SiteSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SiteSetting whereGroup($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SiteSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SiteSetting whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SiteSetting whereLabel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SiteSetting whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SiteSetting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SiteSetting whereValue($value)
 * @mixin \Eloquent
 */
class SiteSetting extends Model
{
    protected $fillable = ['key', 'label', 'value', 'group', 'type'];

    /**
     * Get a setting value by key.
     */
    public static function get(string $key, $default = null): mixed
    {
        return static::where('key', $key)->value('value') ?? $default;
    }

    /**
     * Set a setting value by key.
     */
    public static function set(string $key, $value): void
    {
        static::where('key', $key)->update(['value' => $value]);
    }
}
