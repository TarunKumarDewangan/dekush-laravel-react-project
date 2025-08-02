<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class AuthController extends Controller
{
    // public function register(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|string|email|max:255|unique:users',
    //         'phone_number' => [
    //             'required',
    //             'string',
    //             'unique:users',
    //             // This regex ensures the number starts with 6, 7, 8, or 9, followed by 9 digits.
    //             'regex:/^[6-9]\d{9}$/'
    //         ],
    //         'password' => 'required|string|min:8|confirmed',
    //         'role' => 'required|string|in:shopowner,user',

    //     ]);

    //     $user = User::create([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'phone_number' => $request->phone_number,
    //         'password' => Hash::make($request->password),
    //         'role' => $request->role,
    //     ]);



    //     return response()->json([
    //         'message' => 'User registered successfully! Please log in.'
    //     ], 201);


    // }

    // public function login(Request $request)
    // {
    //     // $request->validate([
    //     //     'phone_number' => 'required|string',
    //     //     'password' => 'required',
    //     // ]);

    //     // $user = User::where('phone_number', $request->phone_number)->first();
    //     // $request->validate(['email' => 'required|email', 'password' => 'required']);
    //     // $user = User::where('email', $request->email)->first();
    //     // if (!$user || !Hash::check($request->password, $user->password)) {
    //     //     throw ValidationException::withMessages(['email' => ['The provided credentials do not match our records.']]);
    //     // }
    //     // $token = $user->createToken('api-token')->plainTextToken;
    //     // $user->load('shops'); // Use the plural 'shops' relationship
    //     // return response()->json(['user' => $user, 'token' => $token]);
    //     // 1. Validate the incoming request
    //     $request->validate([
    //         'phone_number' => 'required|string|regex:/^[6-9]\d{9}$/',
    //         'password' => 'required|string',
    //     ]);

    //     // 2. Find the user by their phone number
    //     $user = User::where('phone_number', $request->phone_number)->first();

    //     // 3. Check if the user exists and the password is correct
    //     if (!$user || !Hash::check($request->password, $user->password)) {
    //         throw ValidationException::withMessages([
    //             'phone_number' => ['The provided credentials do not match our records.']
    //         ]);
    //     }

    //     // 4. Eager load the user's shops
    //     $user->load('shops');

    //     // 5. Create a Sanctum API token for the user
    //     $token = $user->createToken('api-token')->plainTextToken;

    //     // 6. Return the user and the token
    //     return response()->json(['user' => $user, 'token' => $token]);
    // }



    // public function logout(Request $request)
    // {
    //     $request->user()->currentAccessToken()->delete();
    //     return response()->json(['message' => 'Successfully logged out']);
    // }

    // public function user(Request $request)
    // {
    //     $user = $request->user();
    //     $user->load('shops'); // Use the plural 'shops' relationship
    //     return $user;
    // }
    /**
     * Handle a registration request.
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone_number' => ['required', 'string', 'unique:users', 'regex:/^[6-9]\d{9}$/'],
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|in:shopowner,user',
        ]);

        $user = User::create([
            'name' => $request->name,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return response()->json(['message' => 'User registered successfully! Please log in.'], 201);
    }

    /**
     * Handle a login request.
     */
    public function login(Request $request)
    {
        // $request->validate([
        //     'phone_number' => 'required|string',
        //     'password' => 'required',
        // ]);

        // $user = User::where('phone_number', $request->phone_number)->first();

        // if (!$user || !Hash::check($request->password, $user->password)) {
        //     throw ValidationException::withMessages([
        //         'phone_number' => ['The provided credentials do not match our records.']
        //     ]);
        // }

        // $token = $user->createToken('api-token')->plainTextToken;
        // $user->load('shops');
        // return response()->json(['user' => $user, 'token' => $token]);
        // 1. Validate the incoming request. We expect a 'login_identifier' and a password.
        $request->validate([
            'login_identifier' => 'required|string',
            'password' => 'required|string',
        ]);

        $loginIdentifier = $request->input('login_identifier');

        // 2. Intelligently determine if the user typed an email or a phone number.
        $fieldType = filter_var($loginIdentifier, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone_number';

        // 3. Find the user in the database using the correct field.
        $user = User::where($fieldType, $loginIdentifier)->first();

        // 4. Check if the user was found and if the password is correct.
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                // Use a generic message for security reasons.
                'login_identifier' => ['The provided credentials do not match our records.']
            ]);
        }

        // 5. If successful, load the user's shops and create a new API token.
        $user->load('shops');
        $token = $user->createToken('api-token')->plainTextToken;

        // 6. Return the user data and the token.
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
        $user->load('shops');
        return $user;
    }
}
