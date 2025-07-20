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
        $mainCategories = Category::whereNull('parent_id')
            ->where('is_active', true)
            // Eager load the children sub-categories
            ->with([
                'children' => function ($query) {
                    $query->where('is_active', true)->orderBy('name');
                }
            ])
            ->orderBy('name')
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
}
