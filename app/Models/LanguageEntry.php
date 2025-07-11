<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
