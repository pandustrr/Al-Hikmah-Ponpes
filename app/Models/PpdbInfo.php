<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $lembaga_id
 * @property string|null $description
 * @property string|null $contact_number
 * @property string|null $contact_name
 * @property array<array-key, mixed>|null $contact_persons
 * @property string|null $registration_link
 * @property bool $is_link_active
 * @property string|null $banner_url
 * @property bool $is_activex
 * @property bool $is_open
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Lembaga $lembaga
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PpdbInfo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PpdbInfo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PpdbInfo query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PpdbInfo whereBannerUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PpdbInfo whereContactName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PpdbInfo whereContactNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PpdbInfo whereContactPersons($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PpdbInfo whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PpdbInfo whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PpdbInfo whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PpdbInfo whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PpdbInfo whereIsLinkActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PpdbInfo whereIsOpen($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PpdbInfo whereLembagaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PpdbInfo whereRegistrationLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PpdbInfo whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PpdbInfo extends Model
{
    protected $fillable = ['lembaga_id', 'description', 'contact_number', 'contact_name', 'contact_persons', 'registration_link', 'banner_url', 'is_active', 'is_open', 'is_link_active'];

    protected $casts = [
        'contact_persons' => 'array',
        'is_active'       => 'boolean',
        'is_open'         => 'boolean',
        'is_link_active'  => 'boolean',
    ];

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class);
    }
}
