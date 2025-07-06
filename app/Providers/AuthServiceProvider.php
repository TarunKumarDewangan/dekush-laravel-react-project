<?php

namespace App\Providers;
use App\Models\Shop;
use App\Models\User;
use App\Models\Product;
use Illuminate\Support\Facades\Gate;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        // --- ADD THIS NEW GATE DEFINITION ---
        /**
         * Determines if a user can create a shop.
         * Only users with the 'shopowner' role can.
         */
        Gate::define('create-shop', function (User $user) {
            return $user->role === 'shopowner';
        });
        // --- END OF ADDITION ---


        /**
         * Determines if a user can update a specific shop.
         * Only the user who owns the shop can.
         */
        Gate::define('update-shop', function (User $user, Shop $shop) {
            return $user->id === $shop->user_id;
        });


        /**
         * Determines if a user can manage a specific product (update/delete).
         * This checks if the user owns the shop that the product belongs to.
         */
        Gate::define('manage-product', function (User $user, Product $product) {
            // This assumes your Product model has a 'shop' relationship defined.
            return $user->id === $product->shop->user_id;
        });
    }
}
