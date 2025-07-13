<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone_number' => [
                'required',
                'string',
                'unique:users',
                // This regex ensures the number starts with 6, 7, 8, or 9, followed by 9 digits.
                'regex:/^[6-9]\d{9}$/'
            ],
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|in:shopowner,user',

        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);



        return response()->json([
            'message' => 'User registered successfully! Please log in.'
        ], 201);


    }

    public function login(Request $request)
    {
        $request->validate(['email' => 'required|email', 'password' => 'required']);
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages(['email' => ['The provided credentials do not match our records.']]);
        }
        $token = $user->createToken('api-token')->plainTextToken;
        $user->load('shops'); // Use the plural 'shops' relationship
        return response()->json(['user' => $user, 'token' => $token]);
    }



    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function user(Request $request)
    {
        $user = $request->user();
        $user->load('shops'); // Use the plural 'shops' relationship
        return $user;
    }
}
