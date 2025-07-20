<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shop;
use App\Models\Product;
use App\Models\Hospital;
use App\Models\Ambulance;

class SearchController extends Controller
{
    // public function suggestions(Request $request)
    // {
    //     // 1. Get the search term from the URL query string
    //     $query = $request->input('q');

    //     // 2. If the query is too short, return nothing.
    //     if (!$query || strlen($query) < 2) {
    //         return response()->json([]);
    //     }

    //     // 3. Quickly get matching names from each model.
    //     // 'pluck' is very efficient as it only retrieves a single column.
    //     $shops = Shop::where('name', 'LIKE', "%{$query}%")->limit(3)->pluck('name');
    //     $products = Product::where('name', 'LIKE', "%{$query}%")->limit(3)->pluck('name');
    //     $hospitals = Hospital::where('name', 'LIKE', "%{$query}%")->limit(3)->pluck('name');

    //     // 4. Merge all results into a single collection.
    //     $allSuggestions = $shops->concat($products)->concat($hospitals);

    //     // 5. Get the unique values and limit the total number of suggestions.
    //     $uniqueSuggestions = $allSuggestions->unique()->take(7);

    //     // 6. Return the simple array of strings.
    //     return response()->json($uniqueSuggestions);
    // }

    public function suggestions(Request $request)
    {
        // 1. Get the search term
        $query = $request->input('q');

        // 2. If the query is too short, return nothing.
        if (!$query || strlen($query) < 2) {
            return response()->json([]);
        }

        // --- NEW: Search predefined categories ---
        $categories = ['shops', 'products', 'hospitals', 'ambulances'];
        $matchingCategories = array_filter(
            $categories,
            // Find any category that starts with the user's query
            fn($category) => str_starts_with($category, strtolower($query))
        );
        // --- END OF NEW PART ---

        // 3. Quickly get matching names from each model.
        $shops = Shop::where('name', 'LIKE', "%{$query}%")->limit(3)->pluck('name');
        $products = Product::where('name', 'LIKE', "%{$query}%")->limit(3)->pluck('name');
        $hospitals = Hospital::where('name', 'LIKE', "%{$query}%")->limit(3)->pluck('name');

        // --- NEW: Query the ambulances table ---
        $ambulances = Ambulance::where('service_name', 'LIKE', "%{$query}%")
            ->orWhere('city', 'LIKE', "%{$query}%")
            ->limit(3)
            ->pluck('service_name');
        // --- END OF NEW PART ---

        // 4. Merge all results, starting with the categories.
        $allSuggestions = collect($matchingCategories)
            ->concat($shops)
            ->concat($products)
            ->concat($hospitals)
            ->concat($ambulances); // <-- Add the ambulance results to the collection

        // 5. Get the unique values and limit the total number of suggestions.
        //    ->values() re-indexes the array to ensure it's a clean [0, 1, 2...] array for JSON.
        $uniqueSuggestions = $allSuggestions->unique()->take(7)->values();

        // 6. Return the simple array of strings.
        return response()->json($uniqueSuggestions);
    }
    // public function search(Request $request)
    // {
    //     // 1. Get the search term from the URL query string (e.g., /search?q=medical)
    //     $query = $request->input('q');

    //     // 2. If the query is empty or too short, return no results.
    //     if (!$query || strlen($query) < 2) {
    //         return response()->json([
    //             'shops' => [],
    //             'products' => [],
    //             'hospitals' => [],
    //             'ambulances' => [],
    //         ]);
    //     }

    //     // 3. Search each model where relevant.

    //     // Search Shops by name and description
    //     $shops = Shop::where('name', 'LIKE', "%{$query}%")
    //         ->orWhere('description', 'LIKE', "%{$query}%")
    //         ->with('images') // Eager load images to show on the results page
    //         ->limit(10)
    //         ->get();

    //     // Search Products by name and description. Eager load the shop it belongs to.
    //     $products = Product::where('name', 'LIKE', "%{$query}%")
    //         ->orWhere('description', 'LIKE', "%{$query}%")
    //         ->with('shop') // Eager load the parent shop
    //         ->limit(10)
    //         ->get();

    //     // Search Hospitals by name and address
    //     $hospitals = Hospital::where('name', 'LIKE', "%{$query}%")
    //         ->orWhere('address', 'LIKE', "%{$query}%")
    //         ->limit(10)
    //         ->get();

    //     // Search Ambulances by service name and city
    //     $ambulances = Ambulance::where('service_name', 'LIKE', "%{$query}%")
    //         ->orWhere('city', 'LIKE', "%{$query}%")
    //         ->limit(10)
    //         ->get();

    //     // 4. Return all the results in a structured JSON object.
    //     return response()->json([
    //         'shops' => $shops,
    //         'products' => $products,
    //         'hospitals' => $hospitals,
    //         'ambulances' => $ambulances,
    //     ]);
    // }

    public function search(Request $request)
    {
        $query = $request->input('q');

        if (!$query) {
            return response()->json(['message' => 'A search query is required.'], 422);
        }

        // Initialize empty collections to hold results
        $shops = collect();
        $products = collect();
        $hospitals = collect();
        $ambulances = collect();

        $searchQuery = strtolower($query);

        // --- NEW LOGIC: Check if the search is for a specific category ---
        $categories = ['shops', 'products', 'hospitals', 'ambulances'];

        if (in_array($searchQuery, $categories)) {
            // This is a CATEGORY search. Load all items for that category.
            switch ($searchQuery) {
                case 'shops':
                    $shops = Shop::with('images')->orderBy('name')->get();
                    break;
                case 'hospitals':
                    $hospitals = Hospital::orderBy('name')->get();
                    break;
                case 'ambulances':
                    $ambulances = Ambulance::orderBy('service_name')->get();
                    break;
                // Note: We don't handle a search for just "products" as it could be too large.
                // A keyword search is better for products.
            }
        } else {
            // This is a KEYWORD search. Search across all tables.
            $shops = Shop::where('name', 'LIKE', "%{$query}%")
                ->orWhere('description', 'LIKE', "%{$query}%")
                ->with('images')->limit(10)->get();

            $products = Product::where('name', 'LIKE', "%{$query}%")
                ->orWhere('description', 'LIKE', "%{$query}%")
                ->with('shop')->limit(10)->get();

            $hospitals = Hospital::where('name', 'LIKE', "%{$query}%")
                ->orWhere('address', 'LIKE', "%{$query}%")
                ->limit(10)->get();

            $ambulances = Ambulance::where('service_name', 'LIKE', "%{$query}%")
                ->orWhere('city', 'LIKE', "%{$query}%")
                ->limit(10)->get();
        }

        // Return all the results in a structured JSON object.
        return response()->json([
            'shops' => $shops,
            'products' => $products,
            'hospitals' => $hospitals,
            'ambulances' => $ambulances,
        ]);
    }
}
