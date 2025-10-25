<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule; // Make sure this is imported

class ProfileController extends Controller
{
    /**
     * Update the authenticated user's profile information (e.g., name).
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $user->update($validated);

        return response()->json($user);
    }

    /**
     * Update the authenticated user's password (without current password verification).
     */
    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'password' => 'required|string|min:8|confirmed', // We only need the new password
        ]);

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json(['message' => 'Password updated successfully.']);
    }

    /**
     * (INSECURE) Update the authenticated user's phone number without verification.
     * It is highly recommended to replace this with an OTP verification flow.
     */
    public function updatePhoneNumber(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'phone_number' => [
                'required',
                'string',
                'regex:/^[6-9]\d{9}$/',
                // Ensure the new number isn't already used by another account
                Rule::unique('users')->ignore($user->id),
            ],
        ]);

        $user->update($validated);

        // Send back the updated user object
        return response()->json($user);
    }
}
