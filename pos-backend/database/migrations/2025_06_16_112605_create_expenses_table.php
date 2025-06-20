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
    Schema::create('expenses', function (Blueprint $table) {
        $table->id();
        $table->string('group_id'); // Untuk mengelompokkan item pengeluaran
        $table->string('name'); // nama pengeluaran
        $table->integer('amount'); // jumlah pengeluaran
        $table->timestamps(); // Kolom date (created_at)
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
