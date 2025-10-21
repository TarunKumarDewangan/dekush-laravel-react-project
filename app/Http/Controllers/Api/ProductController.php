<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Shop;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                // Rule: The name must be unique in the 'products' table for the given 'shop_id'
                Rule::unique('products')->where(function ($query) use ($request) {
                    return $query->where('shop_id', $request->shop_id);
                }),
            ],
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'shop_id' => 'required|exists:shops,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $shop = Shop::findOrFail($validatedData['shop_id']);
        // Use a Gate to authorize that the current user owns this shop
        Gate::authorize('update-shop', $shop);

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

    public function update(Request $request, Product $product)
    {
        // 1. Authorize: Ensure the user owns the shop this product belongs to.
        // This is a critical security check.
        if ($request->user()->id !== $product->shop->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // 2. Validate the incoming data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // For a new image upload
            'delete_image' => 'nullable|boolean', // A flag to signal image deletion
        ]);

        $productData = [
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'price' => $validatedData['price'],
        ];

        // 3. Handle Image Deletion
        if ($request->input('delete_image') && $product->image_path) {
            Storage::disk('public')->delete($product->image_path);
            $productData['image_path'] = null; // Remove image path from database
        }

        // 4. Handle New Image Upload
        if ($request->hasFile('image')) {
            // If there's an old image, delete it first to prevent orphaned files
            if ($product->image_path) {
                Storage::disk('public')->delete($product->image_path);
            }
            // Store the new image and get its path
            $path = $request->file('image')->store('product_images', 'public');
            $productData['image_path'] = $path;
        }

        // 5. Update the product in the database
        $product->update($productData);

        // 6. Return the updated product
        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        Gate::authorize('manage-product', $product);
        $product->delete();
        return response()->noContent();
    }
}
