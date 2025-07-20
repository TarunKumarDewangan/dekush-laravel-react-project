<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'parent_id', // <-- ADD THIS
        'description',
        'icon',
        'is_active',
    ];

    // --- NEW RELATIONSHIPS ---

    // A category can have one parent.
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    // A category can have many children (sub-categories).
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    // --- EXISTING RELATIONSHIP ---
    public function shops()
    {
        return $this->hasMany(Shop::class);
    }

    // Automatically create a slug. We'll modify this to ensure slugs are unique.
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($category) {
            $slug = Str::slug($category->name, '-');
            $count = static::whereRaw("slug RLIKE '^{$slug}(-[0-9]+)?$'")->count();
            $category->slug = $count ? "{$slug}-{$count}" : $slug;
        });
    }
}
