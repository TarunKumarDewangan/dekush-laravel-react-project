<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();

            // --- ADDED/CONSOLIDATED COLUMNS ---
            $table->string('address')->nullable();
            $table->string('shop_incharge_phone')->nullable();
            // You can add other original columns here if they existed, e.g.:
            $table->string('contact_info')->nullable();
            $table->string('logo_path')->nullable();
            $table->boolean('is_active')->default(true);
            // --- END OF ADDED COLUMNS ---

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shops');
    }
};
