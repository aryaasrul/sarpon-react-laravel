<?php

// dalam file app/Models/Order.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // <-- BARIS INI PENTING
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'name',
        'quantity',
        'price',
        'hpp',
    ];
}