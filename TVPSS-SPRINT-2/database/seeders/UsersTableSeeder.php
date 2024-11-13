<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use MongoDB\Client as MongoClient;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // Create a MongoDB client instance
        $uri = "mongodb+srv://auninajwa:auninajwa@cluster0.s5wms.mongodb.net/";
        $client = new MongoClient($uri);

        // Specify your database and collection
        $collection = $client->tvpssDB->users; // Change 'users' to your actual collection name

        // Example fixed user data
        $users = [
            ['email' => 'adminppd@moe.gov.my', 'password' => bcrypt('Admin@123')],
            ['email' => 'adminschool@moe.gov.my', 'password' => bcrypt('AdminSchool@123')],
            ['email' => 'adminstate@moe.gov.my', 'password' => bcrypt('AdminState@123')],
            ['email' => 'superadmin@moe.gov.my', 'password' => bcrypt('SuperAdmin@123')],
        ];

        foreach ($users as $user) {
            try {
                // Insert user data
                $collection->insertOne($user);
            } catch (\MongoDB\Driver\Exception\Exception $e) {
                // Handle duplicate key error gracefully
                if ($e->getCode() === 11000) {
                    // Skip if it's a duplicate key error
                } else {
                    // For other errors, rethrow
                    throw $e;
                }
            }
        }
    }
}
