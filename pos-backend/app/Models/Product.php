<?php

// dalam file app/Models/Product.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // <-- BARIS INI PENTING
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'hpp',
        'kategori',
    ];

    protected $casts = [
        'kategori' => 'array',
    ];
}


