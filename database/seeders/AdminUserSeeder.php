<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@example.com'], // Check if user with this email exists
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'), // Always hash passwords!
                'role' => 'admin',
            ]
        );
    }
}
