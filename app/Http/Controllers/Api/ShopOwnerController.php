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
            'images' => 'nullable|array|max:4', // Can be empty, must be an array, max 4 items
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048' // Each item must be an image
        ]);

        $shop = $request->user()->shops()->create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'address' => $validated['address'],
            'shop_incharge_phone' => $validated['shop_incharge_phone'],
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
    public function show(Shop $shop)
    {
        return $shop->load(['products', 'user', 'images']);
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
    public function destroy(string $id)
    {
        //
    }
}
