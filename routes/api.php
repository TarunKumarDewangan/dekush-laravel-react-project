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
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OtpController;

// --- PUBLIC ROUTES ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/shops', [ShopController::class, 'index']);
Route::get('/shops/{shop}', [ShopController::class, 'show']);
Route::get('/hospitals', [HospitalController::class, 'index']);
Route::get('/ambulances', [AmbulanceController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category:slug}/shops', [CategoryController::class, 'showShops']);
Route::get('/search', [SearchController::class, 'search']);
Route::get('/suggestions', [SearchController::class, 'suggestions']);
Route::post('/language-entries', [LanguageController::class, 'store']);

// --- PROTECTED ROUTES ---
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Product Management
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::post('/products/{product}', [ProductController::class, 'update']); // <-- ADDED FOR FILE UPLOADS
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    // Shop Owner
    Route::prefix('owner')->group(function () {
        Route::get('/shops', [ShopOwnerController::class, 'index']);
        Route::post('/shops', [ShopOwnerController::class, 'store']);
        Route::get('/shops/{shop}', [ShopOwnerController::class, 'show']);
        Route::delete('/shops/{shop}', [ShopOwnerController::class, 'destroy']);
        Route::post('/shops/{shop}', [ShopOwnerController::class, 'update']);
        Route::delete('/shops/images/{shopImage}', [ShopOwnerController::class, 'destroyImage']);
        Route::get('/categories/all', [ShopOwnerController::class, 'getAllCategories']);
    });
});

// --- ADMIN ROUTES ---
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/users', [AdminController::class, 'getAllUsers']);
    Route::post('/users', [AdminController::class, 'createUser']);
    Route::put('/users/{user}', [AdminController::class, 'update']);
    Route::delete('/users/{user}', [AdminController::class, 'deleteUser']);
    Route::get('/categories/all', [CategoryController::class, 'getAll']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
});
