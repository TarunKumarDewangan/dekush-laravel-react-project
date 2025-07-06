<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Gate;

class ProductController extends Controller
{
    // Create a new product for the authenticated user's shop
    public function store(Request $request)
    {
        // 1. Check if the authenticated user is a shop owner and has a shop
        $user = $request->user();
        if ($user->role !== 'shopowner' || !$user->shop) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // 2. Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        // 3. Create the product associated with the user's shop
        $product = $user->shop->products()->create($validatedData);

        return response()->json($product, 201);
    }

    // Update an existing product
    public function update(Request $request, Product $product)
    {
        // Use the Gate to authorize the action
        Gate::authorize('manage-product', $product);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        $product->update($validatedData);

        return response()->json($product);
    }

    // Delete a product
    public function destroy(Product $product)
    {
        // Use the Gate to authorize the action
        Gate::authorize('manage-product', $product);

        $product->delete();

        // Return a 204 No Content response, which is standard for a successful delete
        return response()->noContent();
    }
}
