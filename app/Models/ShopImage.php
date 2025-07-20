<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $shop_id
 * @property string $image_path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Shop $shop
 * @method static \Illuminate\Database\Eloquent\Builder|ShopImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ShopImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ShopImage query()
 * @method static \Illuminate\Database\Eloquent\Builder|ShopImage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ShopImage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ShopImage whereImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ShopImage whereShopId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ShopImage whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ShopImage extends Model
{
    use HasFactory;
    protected $fillable = ['shop_id', 'image_path'];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }
}
