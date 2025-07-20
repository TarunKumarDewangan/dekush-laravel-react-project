<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of all active categories. (Public)
     */
    public function index()
    {
        //return Category::where('is_active', true)->orderBy('name')->get();
        // Fetch only top-level (main) categories
        // version $mainCategories = Category::whereNull('parent_id')
        //     ->where('is_active', true)
        //     // Eager load the children sub-categories
        //     ->with([
        //         'children' => function ($query) {
        //             $query->where('is_active', true)->orderBy('name');
        //         }
        //     ])
        //     ->orderBy('name')
        //     ->get();

        // return $mainCategories;

        $mainCategories = Category::whereNull('parent_id')
            ->where('is_active', true)
            // 'withCount' creates a new property on the model called 'shops_count'
            // We're counting the shops related through our 'children' sub-category relationship.
            ->withCount([
                'children as shops_count' => function ($query) {
                    $query->selectRaw('count(distinct shops.id)')
                        ->join('shops', 'categories.id', '=', 'shops.category_id')
                        ->where('shops.is_active', true);
                }
            ])
            // Eager load the active children (sub-categories) for the final result
            ->with([
                'children' => function ($query) {
                    $query->where('is_active', true)->orderBy('name');
                }
            ])
            // Order the main categories by the new 'shops_count' property
            ->orderByDesc('shops_count')
            // Limit to the top 5
            ->limit(5)
            ->get();

        return $mainCategories;
    }

    /**
     * Display all shops for a given category slug. (Public)
     */
    public function showShops(Category $category)
    {
        // Load the category with its shops, and for each shop, load its images
        $category->load([
            'shops' => function ($query) {
                $query->where('is_active', true)->with('images')->orderBy('name');
            }
        ]);

        return response()->json($category);
    }

    public function store(Request $request)
    {
        // $validated = $request->validate([
        //     'name' => 'required|string|max:255|unique:categories',
        //     // Add validation for other fields if the form sends them (e.g., 'icon')
        // ]);

        // $category = Category::create($validated);

        // return response()->json($category, 201);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id', // Can be null (for main) or must exist
        ]);

        $category = Category::create($validated);

        return response()->json($category, 201);
    }
    public function getAll()
    {
        // Fetch all top-level categories, including inactive ones
        $mainCategories = Category::whereNull('parent_id')
            ->with([
                'children' => function ($query) {
                    // Also get inactive children for the admin view
                    $query->orderBy('name');
                }
            ])
            ->orderBy('name')
            ->get();

        return $mainCategories;
    }
    public function destroy(Category $category)
    {
        // When a main category is deleted, the onDelete('cascade') in the migration
        // will automatically delete all of its sub-categories.
        $category->delete();

        return response()->noContent();
    }
}
