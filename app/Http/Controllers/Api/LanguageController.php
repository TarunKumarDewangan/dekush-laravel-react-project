<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LanguageEntry;

class LanguageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'source_language' => 'required|string|max:50',
            'source_phrase' => 'required|string|max:1000',
            'target_language' => 'required|string|max:50',
            'target_phrase' => 'required|string|max:1000',
        ]);

        LanguageEntry::create($validated); // Status defaults to 'pending'

        return response()->json(['message' => 'Entry submitted for verification. Thank you!'], 201);
    }

    // --- PROTECTED METHODS FOR VERIFIERS ---
    public function getPending(Request $request)
    {
        // Later, we'll add a Gate to ensure only verifiers can access this.
        return LanguageEntry::where('status', 'pending')->get();
    }

    public function approve(Request $request, LanguageEntry $entry)
    {
        $entry->update(['status' => 'approved']);
        return response()->json(['message' => 'Entry approved.']);
    }

    public function reject(Request $request, LanguageEntry $entry)
    {
        $entry->update(['status' => 'rejected']);
        return response()->json(['message' => 'Entry rejected.']);
    }
}
