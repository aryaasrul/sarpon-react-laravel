<?php
// dalam file database/factories/OrderFactory.php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'transaction_id' => 'txn_' . fake()->unixTime(),
            'name' => fake()->randomElement(['Kopi Susu Gula Aren', 'Americano', 'Croissant Cokelat', 'Cireng']),
            'quantity' => fake()->numberBetween(1, 3),
            'price' => fake()->randomElement([18000, 22000, 15000, 10000]),
            'hpp' => fake()->randomElement([5000, 7000, 6000, 4000]),
            // Membuat data dengan tanggal acak dalam 30 hari terakhir
            'created_at' => fake()->dateTimeBetween('-30 days', 'now'),
            'updated_at' => now(),
        ];
    }
}