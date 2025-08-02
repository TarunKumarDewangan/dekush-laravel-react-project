<!-- <?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;

class OtpController extends Controller
{
    public function sendOtp(Request $request)
    {
        $request->validate(['phone_number' => 'required|string|regex:/^[6-9]\d{9}$/']);
        if (User::where('phone_number', $request->phone_number)->exists()) {
            return response()->json(['message' => 'This phone number is already registered.'], 409);
        }
        $apiKey = env('TWOFACTOR_API_KEY');
        $phoneNumber = $request->phone_number;

        // This is the correct endpoint for your template.
        $url = "https://2factor.in/API/V1/{$apiKey}/SMS/{$phoneNumber}/AUTOGEN/Registration Verification";

        try {
            $response = Http::get($url);
            $result = $response->json();
            if (isset($result['Status']) && $result['Status'] == 'Success') {
                $sessionId = $result['Details'];
                session(['otp_session_id' => $sessionId]);
                return response()->json(['message' => 'OTP sent successfully.']);
            } else {
                \Log::error('2Factor Send Error: ' . json_encode($result));
                return response()->json(['message' => $result['Details'] ?? 'Failed to send OTP.'], 500);
            }
        } catch (\Exception $e) {
            \Log::error('2Factor Send Exception: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to send OTP. Please try again later.'], 500);
        }
    }

    public function verifyAndRegister(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone_number' => 'required|string|unique:users,phone_number',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|in:shopowner,user',
            'otp' => 'required|string|digits:6',
        ]);
        $apiKey = env('TWOFACTOR_API_KEY');
        $otp = $validated['otp'];
        $sessionId = session('otp_session_id');

        if (!$sessionId) {
            return response()->json(['message' => 'OTP session expired. Please request a new one.'], 400);
        }

        $url = "https://2factor.in/API/V1/{$apiKey}/SMS/VERIFY/{$sessionId}/{$otp}";

        try {
            $response = Http::get($url);
            $result = $response->json();
            if (isset($result['Status']) && $result['Status'] == 'Success') {
                User::create([
                    'name' => $validated['name'],
                    'phone_number' => $validated['phone_number'],
                    'password' => Hash::make($validated['password']),
                    'role' => $validated['role'],
                ]);
                session()->forget('otp_session_id');
                return response()->json(['message' => 'User registered successfully!'], 201);
            } else {
                return response()->json(['message' => $result['Details'] ?? 'Invalid OTP.'], 401);
            }
        } catch (\Exception $e) {
            \Log::error('2Factor Verify Exception: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to verify OTP. Please try again later.'], 500);
        }
    }
} -->

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;

class OtpController extends Controller
{
    /**
     * Send an OTP using the 2Factor.in R1 Transactional API.
     */
    public function sendOtp(Request $request)
    {
        $request->validate(['phone_number' => 'required|string|regex:/^[6-9]\d{9}$/']);
        $phoneNumber = $request->phone_number;

        if (User::where('phone_number', $phoneNumber)->exists()) {
            return response()->json(['message' => 'This phone number is already registered.'], 409);
        }

        // 1. Generate our own secure 6-digit OTP
        $otp = rand(100000, 999999);

        // 2. Store this OTP in our application's cache for 5 minutes
        Cache::put('otp_' . $phoneNumber, $otp, now()->addMinutes(5));

        // 3. Prepare the message using your DLT-approved template format
        //    The documentation shows: Your OTP is {#var#} for {#var#}
        //    The API expects you to replace the variable yourself.
        $message = "Your OTP for Dekush is {$otp}.";

        try {
            // --- THIS IS THE CORRECTED API CALL ---
            $response = Http::asForm()->post('https://2factor.in/API/R1/', [
                'module' => 'TRANS_SMS',
                'apikey' => env('TWOFACTOR_API_KEY'),
                'to' => $phoneNumber,
                'from' => 'dekush', // Replace with your approved Sender ID
                'msg' => $message,
                'peid' => 'YOUR_DLT_PEID',         // Replace with your Principal Entity ID
                'ctid' => 'YOUR_DLT_TEMPLATE_ID', // Replace with your Content Template ID
            ]);

            $result = $response->json();

            if (isset($result['Status']) && $result['Status'] == 'Success') {
                return response()->json(['message' => 'OTP sent successfully.']);
            } else {
                \Log::error('2Factor R1 Send Error: ' . json_encode($result));
                return response()->json(['message' => $result['Details'] ?? 'Failed to send OTP.'], 500);
            }
        } catch (\Exception $e) {
            \Log::error('2Factor R1 Send Exception: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to send OTP. Please try again later.'], 500);
        }
    }

    /**
     * Verify the OTP against our cache and register the user.
     * This method does not need to change.
     */
    public function verifyAndRegister(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone_number' => 'required|string|unique:users,phone_number',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|in:shopowner,user',
            'otp' => 'required|string|digits:6',
        ]);

        $phoneNumber = $validated['phone_number'];
        $otp = $validated['otp'];
        $cachedOtp = Cache::get('otp_' . $phoneNumber);

        if (!$cachedOtp || $cachedOtp != $otp) {
            return response()->json(['message' => 'Invalid or expired OTP.'], 401);
        }

        Cache::forget('otp_' . $phoneNumber);

        User::create([
            'name' => $validated['name'],
            'phone_number' => $validated['phone_number'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        return response()->json(['message' => 'User registered successfully!'], 201);
    }
}
