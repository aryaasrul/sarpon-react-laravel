<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    /**
     * Menampilkan daftar semua pengeluaran.
     */
    public function index()
    {
        $expenses = Expense::orderBy('created_at', 'desc')->get();
        return response()->json($expenses);
    }

    /**
     * Menyimpan data pengeluaran baru.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|integer|min:1',
        ]);
        
        // Membuat group_id sederhana untuk pengelompokan
        $validatedData['group_id'] = 'exp_' . now()->timestamp;

        $expense = Expense::create($validatedData);
        return response()->json($expense, 201);
    }
}