<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $address
 * @property string $phone_number
 * @property string|null $description
 * @property string|null $image_path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Hospital newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Hospital newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Hospital query()
 * @method static \Illuminate\Database\Eloquent\Builder|Hospital whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hospital whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hospital whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hospital whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hospital whereImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hospital whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hospital wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hospital whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Hospital extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'address', 'phone_number', 'description', 'image_path'];
}

