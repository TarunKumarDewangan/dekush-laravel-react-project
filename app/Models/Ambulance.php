<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $service_name
 * @property string $city
 * @property string $phone_number
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Ambulance newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Ambulance newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Ambulance query()
 * @method static \Illuminate\Database\Eloquent\Builder|Ambulance whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ambulance whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ambulance whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ambulance wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ambulance whereServiceName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ambulance whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Ambulance extends Model
{
    use HasFactory;
    protected $fillable = ['service_name', 'city', 'phone_number'];
}
