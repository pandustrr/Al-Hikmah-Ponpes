<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int|null $lembaga_id
 * @property string $question
 * @property string $answer
 * @property int $order
 * @property int $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Lembaga|null $lembaga
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Faq newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Faq newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Faq query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Faq whereAnswer($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Faq whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Faq whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Faq whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Faq whereLembagaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Faq whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Faq whereQuestion($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Faq whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Faq extends Model
{
    protected $fillable = ['lembaga_id', 'question', 'answer', 'order', 'is_active'];

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class);
    }
}
