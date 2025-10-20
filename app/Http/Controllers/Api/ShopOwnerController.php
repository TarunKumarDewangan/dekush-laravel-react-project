<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shop;
use App\Models\Category;
// --- MAKE SURE THESE 4 LINES EXIST ---
use App\Models\ShopImage; // <--- THIS IS THE FIX
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;


class ShopOwnerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Eager-load the 'images' relationship for each shop
        return $request->user()->shops()->with('images')->get();
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'required|string|max:255',
            'shop_incharge_phone' => 'required|string|regex:/^[6-9]\d{9}$/',
            'category_id' => 'required|exists:categories,id',
            'images' => 'nullable|array|max:4',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $shop = $request->user()->shops()->create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'address' => $validated['address'],
            'shop_incharge_phone' => $validated['shop_incharge_phone'],
            'category_id' => $validated['category_id'],
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $imageFile) {
                $path = $imageFile->store('shop_images', 'public');
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
        if ($request->user()->id !== $shop->user_id) {
            return response()->json(['message' => 'This action is unauthorized.'], 403);
        }
        $shop->load(['products', 'images', 'category.parent']);
        return response()->json($shop);
    }

    /**
     * Update the specified shop in storage, including adding new images.
     */
    public function update(Request $request, Shop $shop)
    {
        if ($request->user()->id !== $shop->user_id) {
            return response()->json(['message' => 'This action is unauthorized.'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'required|string|max:255',
            'shop_incharge_phone' => 'required|string|regex:/^[6-9]\d{9}$/',
            'category_id' => 'required|exists:categories,id',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $existingImageCount = $shop->images()->count();
        $newImageCount = count($request->file('images') ?? []);
        if ($existingImageCount + $newImageCount > 4) {
            return response()->json([
                'message' => 'The total number of images cannot exceed 4.',
                'errors' => ['images' => ['The total number of images cannot exceed 4.']]
            ], 422);
        }

        $shop->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'address' => $validated['address'],
            'shop_incharge_phone' => $validated['shop_incharge_phone'],
            'category_id' => $validated['category_id'],
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $imageFile) {
                $path = $imageFile->store('shop_images', 'public');
                $shop->images()->create(['image_path' => $path]);
            }
        }

        $shop->load(['images', 'products', 'category.parent']);
        return response()->json($shop);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Shop $shop)
    {
        if ($request->user()->id !== $shop->user_id) {
            return response()->json(['message' => 'This action is unauthorized.'], 403);
        }
        $shop->delete();
        return response()->noContent();
    }

    /**
     * Remove the specified shop image from storage.
     */
    public function destroyImage(Request $request, ShopImage $shopImage)
    {
        $shopImage->load('shop');

        if (!$shopImage->shop) {
            return response()->json(['message' => 'Orphaned image cannot be deleted.'], 404);
        }

        if ($request->user()->id !== $shopImage->shop->user_id) {
            return response()->json(['message' => 'You do not have permission to delete this image.'], 403);
        }

        try {
            if (Storage::disk('public')->exists($shopImage->image_path)) {
                Storage::disk('public')->delete($shopImage->image_path);
            }
            $shopImage->delete();
        } catch (\Exception $e) {
            \Log::error('Error deleting shop image: ' . $e->getMessage());
            return response()->json(['message' => 'A server error occurred while trying to delete the image.'], 500);
        }

        return response()->noContent();
    }

    public function getAllCategories()
    {
        return Category::whereNull('parent_id')
            ->where('is_active', true)
            ->with([
                'children' => function ($query) {
                    $query->where('is_active', true)->orderBy('name');
                }
            ])
            ->orderBy('name')
            ->get();
    }
}
