<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Shop;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule; // <-- 1. MAKE SURE THIS IS IMPORTED

class ProductController extends Controller
{
    // The 'store' method is already correct for both web and mobile
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'shop_id' => 'required|exists:shops,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $shop = Shop::findOrFail($validatedData['shop_id']);

        if ($request->user()->id !== $shop->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $productData = [
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'price' => $validatedData['price'],
        ];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('product_images', 'public');
            $productData['image_path'] = $path;
        }

        $product = $shop->products()->create($productData);

        return response()->json($product, 201);
    }

    // THIS IS THE CORRECTED UPDATE METHOD
    public function update(Request $request, Product $product)
    {
        // Use the Gate to authorize the action
        Gate::authorize('manage-product', $product);

        $validatedData = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                // This rule checks for uniqueness but ignores the current product's own name
                Rule::unique('products')->ignore($product->id),
            ],
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        $product->update($validatedData);

        return response()->json($product);
    }

    // The 'destroy' method is correct
    public function destroy(Product $product)
    {
        Gate::authorize('manage-product', $product);
        $product->delete();
        return response()->noContent();
    }
}
