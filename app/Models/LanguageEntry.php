<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|LanguageEntry newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LanguageEntry newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LanguageEntry query()
 * @method static \Illuminate\Database\Eloquent\Builder|LanguageEntry whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LanguageEntry whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LanguageEntry whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class LanguageEntry extends Model
{
    use HasFactory;
    protected $fillable = [
        'source_language',
        'source_phrase',
        'target_language',
        'target_phrase',
        'status'
    ];
}
