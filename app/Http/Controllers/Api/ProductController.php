<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Gate;
use App\Models\Shop;

class ProductController extends Controller
{
    // Create a new product for the authenticated user's shop
    public function store(Request $request)
    {
        //version // // 1. Check if the authenticated user is a shop owner and has a shop
        // $user = $request->user();
        // if ($user->role !== 'shopowner' || !$user->shop) {
        //     return response()->json(['message' => 'Unauthorized'], 403);
        // }

        // // 2. Validate the request data
        // $validatedData = $request->validate([
        //     'name' => 'required|string|max:255',
        //     'description' => 'nullable|string',
        //     'price' => 'required|numeric|min:0',
        // ]);

        // // 3. Create the product associated with the user's shop
        // $product = $user->shop->products()->create($validatedData);

        // return response()->json($product, 201);

        // version // // 1. Validate all incoming data
        // $validatedData = $request->validate([
        //     'name' => 'required|string|max:255',
        //     'description' => 'nullable|string',
        //     'price' => 'required|numeric|min:0',
        //     'shop_id' => 'required|exists:shops,id'
        // ]);

        // // 2. Find the shop
        // $shop = Shop::findOrFail($validatedData['shop_id']);

        // // 3. Authorize the action
        // // if ($request->user()->cannot('update-shop', $shop))
        // if ($request->user()->id !== $shop->user_id) {
        //     return response()->json(['message' => 'Unauthorized'], 403);
        // }

        // // 4. --- THIS IS THE FIX ---
        // // Create the product using ONLY the product-specific fields.
        // // Laravel will automatically add the correct 'shop_id'.
        // $product = $shop->products()->create([
        //     'name' => $validatedData['name'],
        //     'description' => $validatedData['description'],
        //     'price' => $validatedData['price'],
        // ]);

        // return response()->json($product, 201);
        // --- UPDATED VALIDATION ---
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'shop_id' => 'required|exists:shops,id',
            // New rule for the optional image
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

        // --- NEW: Handle the image upload ---
        if ($request->hasFile('image')) {
            // Store the file in 'public/product_images' and get the path
            $path = $request->file('image')->store('product_images', 'public');
            // Add the image path to the data we're saving
            $productData['image_path'] = $path;
        }

        // Create the product with the data (including the image path if it exists)
        $product = $shop->products()->create($productData);

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
