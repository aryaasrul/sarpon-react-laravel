<?php
// dalam file database/seeders/DatabaseSeeder.php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Hapus data lama dan buat ulang
        \App\Models\User::factory(1)->create([
             'name' => 'Kasir Test',
             'email' => 'kasir@test.com',
        ]);
        
        \App\Models\Product::factory(20)->create();
        
        // === TAMBAHKAN KODE DI BAWAH INI ===

        // Membuat 50 data pesanan (pemasukan) palsu
        \App\Models\Order::factory(50)->create();

        // Membuat 15 data pengeluaran palsu
        \App\Models\Expense::factory(15)->create();
    }
}