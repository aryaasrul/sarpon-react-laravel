<?php
// dalam file database/seeders/DatabaseSeeder.php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash; // <-- Pastikan ini diimpor

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Hapus data lama dan buat ulang
        
        // --- BUAT PENGGUNA BARU DI SINI ---
        
        // Akun untuk Anda (Admin/Owner)
        \App\Models\User::factory()->create([
             'name' => 'Arya',
             'email' => 'arya@terang.com',
             'password' => Hash::make('terang123'), // Ganti dengan password yang aman
        ]);
        
        // Akun untuk Karyawan 1
        \App\Models\User::factory()->create([
             'name' => 'Naufal',
             'email' => 'naufal@terang.com',
             'password' => Hash::make('terang123'), // Ganti dengan password yang aman
        ]);

        // ===================================
        
        \App\Models\Product::factory(20)->create();
        \App\Models\Order::factory(50)->create();
        \App\Models\Expense::factory(15)->create();
    }
}
