<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shop;
use Illuminate\Support\Facades\Gate;

class ShopController extends Controller
{
    /**
     * Get a list of all active shops (Public)
     */
    public function index()
    {
        return response()->json([
            'shops' => Shop::where('is_active', true)->with('images')->orderBy('name')->get()
        ]);
    }

    /**
     * Update a shop's details (Protected by the Gate)
     */
    public function update(Request $request, Shop $shop)
    {
        Gate::authorize('update-shop', $shop);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'contact_info' => 'nullable|string|max:255',
            'address' => 'required|string|max:255',
        ]);

        $shop->update($validatedData);

        return response()->json($shop);
    }

    /**
     * Get a single shop and its products (Public)
     */
    public function show(Shop $shop)
    {
        // Eager load the products to prevent extra database queries
        return $shop->load(['products', 'user', 'images']);
    }
}
