<?php
// dalam file database/factories/ExpenseFactory.php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ExpenseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'group_id' => 'exp_' . fake()->unixTime(),
            'name' => fake()->randomElement(['Beli Gula', 'Bayar Listrik', 'Beli Susu UHT', 'Gaji Karyawan']),
            'amount' => fake()->randomElement([50000, 250000, 120000, 1500000]),
            // Membuat data dengan tanggal acak dalam 30 hari terakhir
            'created_at' => fake()->dateTimeBetween('-30 days', 'now'),
            'updated_at' => now(),
        ];
    }
}
