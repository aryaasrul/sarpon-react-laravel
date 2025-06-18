<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    return [
        'name' => fake()->words(2, true), // contoh: "Enim Nemo"
        'price' => fake()->numberBetween(15000, 50000), // harga antara 15rb - 50rb
        'hpp' => fake()->numberBetween(5000, 25000), // hpp antara 5rb - 25rb
        'kategori' => fake()->randomElement([['Espresso Based'], ['Milk Based'], ['Espresso Based', 'Signature']])
    ];
}
}
