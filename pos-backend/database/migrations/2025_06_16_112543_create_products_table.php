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
    Schema::create('products', function (Blueprint $table) {
        $table->id(); // Kolom ID otomatis
        $table->string('name'); // nama produk
        $table->integer('price'); // harga jual (simpan sebagai integer/sen)
        $table->integer('hpp')->default(0); // harga pokok (simpan sebagai integer/sen)
        $table->json('kategori')->nullable(); // kategori produk (bisa menampung array)
        $table->timestamps(); // Kolom created_at & updated_at otomatis
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
