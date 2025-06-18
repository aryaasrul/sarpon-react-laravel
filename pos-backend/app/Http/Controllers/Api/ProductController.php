<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // READ: Mengambil semua produk (sudah ada)
    public function index()
    {
        return response()->json(Product::orderBy('name')->get());
    }

    // CREATE: Menyimpan produk baru
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|integer',
            'hpp' => 'required|integer',
            'kategori' => 'sometimes|array',
        ]);

        $product = Product::create($validatedData);

        return response()->json($product, 201);
    }

    // UPDATE: Memperbarui produk yang sudah ada
    public function update(Request $request, Product $product)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|integer',
            'hpp' => 'required|integer',
            'kategori' => 'sometimes|array',
        ]);

        $product->update($validatedData);

        return response()->json($product);
    }

    // DELETE: Menghapus produk
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(null, 204);
    }
}
