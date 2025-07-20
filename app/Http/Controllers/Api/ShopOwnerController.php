<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shop;

class ShopOwnerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $request->user()->shops()->get();
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'required|string|max:255', // Make address required
            'shop_incharge_phone' => 'required|string|regex:/^[6-9]\d{9}$/', // Use the same 10-digit validation
            'category_id' => 'required|exists:categories,id',
            'images' => 'nullable|array|max:4', // Can be empty, must be an array, max 4 items
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048' // Each item must be an image
        ]);

        $shop = $request->user()->shops()->create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'address' => $validated['address'],
            'shop_incharge_phone' => $validated['shop_incharge_phone'],
            'category_id' => $validated['category_id'],
        ]);

        // Now, handle the images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $imageFile) {
                // Store the file and get the path
                $path = $imageFile->store('shop_images', 'public');

                // --- THIS IS THE FIX ---
                // Create a new ShopImage record associated with the shop
                // and explicitly provide the image_path.
                $shop->images()->create([
                    'image_path' => $path
                ]);
            }
        }

        $shop->load('images');

        return response()->json($shop, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Shop $shop)
    {
        // if ($request->user()->id !== $shop->user_id) {
        //     // If they don't own it, deny access.
        //     return response()->json(['message' => 'Unauthorized'], 403);
        // }

        // // If they do own it, load all the necessary data and return it.
        // return $shop->load(['products', 'images']);



        if ($request->user()->id !== $shop->user_id) {
            return response()->json(['message' => 'This action is unauthorized.'], 403);
        }

        // Load all the necessary data for the management page
        $shop->load(['products', 'images']);

        return response()->json($shop);

        // $this->authorize('view', $shop); // This line replaces the if-statement.
        // $shop->load(['products', 'images']);
        // return response()->json($shop);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Shop $shop)
    {
        // 1. Authorize: Make sure the user owns this shop.
        // This is a critical security check.
        if ($request->user()->id !== $shop->user_id) {
            return response()->json(['message' => 'This action is unauthorized.'], 403);
        }

        // 2. Delete the shop.
        // Because of 'onDelete('cascade')' in your migrations,
        // all associated products and images will also be deleted automatically.
        $shop->delete();

        // 3. Return a success response.
        // 204 No Content is the standard for a successful deletion.
        return response()->noContent();
    }
}
