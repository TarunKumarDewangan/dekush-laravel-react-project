<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|UserImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserImage query()
 * @mixin \Eloquent
 */
class UserImage extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'image_path'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
