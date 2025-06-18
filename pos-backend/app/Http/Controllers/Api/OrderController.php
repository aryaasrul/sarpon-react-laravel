<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Menampilkan daftar semua pesanan.
     */
    public function index()
    {
        // Mengambil semua data dari model Order, diurutkan dari yang paling baru
        $orders = Order::orderBy('created_at', 'desc')->get();
        return response()->json($orders);
    }

    /**
     * Menyimpan pesanan baru ke database.
     */
    public function store(Request $request)
    {
        // Validasi data yang masuk dari frontend
        $request->validate([
            'items' => 'required|array',
            'items.*.name' => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|integer',
            'items.*.hpp' => 'sometimes|integer',
        ]);

        // Membuat ID transaksi yang unik berdasarkan waktu saat ini
        $transactionId = 'txn_' . now()->timestamp;

        // Looping untuk setiap item di dalam keranjang
        foreach ($request->items as $item) {
            Order::create([
                'transaction_id' => $transactionId,
                'name' => $item['name'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'hpp' => $item['hpp'] ?? 0, // Gunakan hpp jika ada, jika tidak maka 0
            ]);
        }

        // Mengirim response sukses kembali ke frontend
        return response()->json(['message' => 'Pesanan berhasil disimpan'], 201);
    }
}