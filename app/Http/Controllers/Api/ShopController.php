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
        return Shop::where('is_active', true)->orderBy('name')->get();
    }

    /**
     * Get a single shop's public details and its products. (Public)
     * Corresponds to: GET /api/shops/{shop}
     */
    public function showPublic(Shop $shop)
    {
        // Renamed from 'show' to 'showPublic' to avoid conflict.
        return $shop->load('products');
    }

    public function showMine(Request $request)
    {
        $shop = $request->user()->shop;

        if (!$shop) {
            return response()->json(['shop' => null]);
        }
        return response()->json(['shop' => $shop]);
    }

    /**
     * Store a newly created shop for the authenticated user. (Protected)
     * Corresponds to: POST /api/shops
     */
    public function store(Request $request)
    {
        // Using a Gate is cleaner than an if statement. See 'Better Idea' below.
        Gate::authorize('create-shop');

        // Check if the user already has a shop
        if ($request->user()->shop) {
            return response()->json(['message' => 'You already own a shop.'], 400);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:shops',
            'description' => 'required|string|max:1000',
        ]);

        $shop = $request->user()->shop()->create($validated);

        return response()->json([
            'message' => 'Shop created successfully!',
            'shop' => $shop
        ], 201);
    }

    public function update(Request $request, Shop $shop)
    {
        Gate::authorize('update-shop', $shop);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'contact_info' => 'nullable|string|max:255',
        ]);

        $shop->update($validatedData);

        return response()->json($shop);
    }

    // Get a single shop and its products (Public)
    public function show(Shop $shop)
    {
        // Eager load the products to prevent extra database queries
        return $shop->load('products');
    }

    // Update a shop's details (Protected by the Gate)

}
