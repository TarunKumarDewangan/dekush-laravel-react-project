<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    public function getAllUsers()
    {
        // Added orderBy('id') to ensure a consistent order
        $users = User::with('shops')->orderBy('id')->get();

        // Wrap the response in an object with a 'users' key
        return response()->json([
            'users' => $users
        ]); // Returns an object: { "users": [...] }
    }

    /**
     * Delete a user.
     */
    public function deleteUser(User $user)
    {
        if ($user->id === auth()->id()) {
            return response()->json(['message' => 'You cannot delete yourself.'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully.']);
    }
    public function update(Request $request, User $user)
    {
        // 1. Validate the incoming data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                // This rule ensures the email is unique, but ignores the current user's own email
                Rule::unique('users')->ignore($user->id),
            ],
            'role' => [
                'required',
                'string',
                // Ensure the role is one of the valid options
                Rule::in(['admin', 'shopowner', 'user']),
            ],
        ]);

        // 2. Update the user with the validated data
        $user->update($validated);

        // 3. Return a successful response with the updated user
        return response()->json([
            'user' => $user,
            'message' => 'User updated successfully.'
        ]);
    }
}
