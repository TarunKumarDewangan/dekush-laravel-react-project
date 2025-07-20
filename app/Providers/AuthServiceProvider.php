<?php

namespace App\Providers;

use App\Models\Shop;
use App\Models\User;
use App\Models\Product;
use Illuminate\Support\Facades\Gate;
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
        Gate::define('create-shop', function (User $user) {
            return $user->role === 'shopowner';
        });

        Gate::define('update-shop', function (User $user, Shop $shop) {
            return $user->id === $shop->user_id;
        });

        Gate::define('manage-product', function (User $user, Product $product) {
            return $user->id === $product->shop->user_id;
        });
    }
}
