<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ShopController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\HospitalController;
use App\Http\Controllers\Api\AmbulanceController;
use App\Http\Controllers\Api\LanguageController;
use App\Http\Controllers\Api\ShopOwnerController;

// --- PUBLIC ROUTES ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/shops', [ShopController::class, 'index']);
Route::get('/shops/{shop}', [ShopController::class, 'show']); // This is the ONLY route for this pattern.
Route::get('/hospitals', [HospitalController::class, 'index']);
Route::get('/ambulances', [AmbulanceController::class, 'index']);
Route::post('/language-entries', [LanguageController::class, 'store']);

// --- PROTECTED ROUTES (Must be logged in) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Shop Owner routes
    Route::get('/owner/shops', [ShopOwnerController::class, 'index']);
    Route::post('/owner/shops', [ShopOwnerController::class, 'store']);
    Route::get('/owner/shops/{shop}', [ShopOwnerController::class, 'show']); // This is the protected route for the management page

    // Shop owner can update their own shop's details
    Route::put('/shops/{shop}', [ShopController::class, 'update']);

    // Product management routes
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
});

// --- ADMIN ONLY ROUTES ---
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/users', [AdminController::class, 'getAllUsers']);
    Route::put('/users/{user}', [AdminController::class, 'update']);
    Route::delete('/users/{user}', [AdminController::class, 'deleteUser']);
});
