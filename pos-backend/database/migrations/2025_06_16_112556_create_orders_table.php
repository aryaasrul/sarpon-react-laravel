<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('orders', function (Blueprint $table) {
        $table->id();
        $table->string('transaction_id'); // Untuk mengelompokkan item dalam 1 transaksi
        $table->string('name'); // nama item
        $table->integer('quantity'); // jumlah item
        $table->integer('price'); // harga per item
        $table->integer('hpp')->default(0); // hpp per item
        $table->timestamps(); // Kolom date (created_at)
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
