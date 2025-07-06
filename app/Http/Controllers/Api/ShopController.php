<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shop;
use Illuminate\Support\Facades\Gate;

class ShopController extends Controller
{
    // Get a list of all active shops (Public)
    public function index()
    {
        // We only want to show shops that are marked as active
        return Shop::where('is_active', true)->get();
    }

    // Get a single shop and its products (Public)
    public function show(Shop $shop)
    {
        // Eager load the products to prevent extra database queries
        return $shop->load('products');
    }

    // Update a shop's details (Protected by the Gate)
    public function update(Request $request, Shop $shop)
    {
        // Use the Gate to authorize the action
        Gate::authorize('update-shop', $shop);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'contact_info' => 'nullable|string|max:255',
        ]);

        $shop->update($validatedData);

        return response()->json($shop);
    }
}
