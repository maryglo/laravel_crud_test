<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Let's truncate our existing records to start from scratch.
        User::truncate();
        // And now, let's create a few articles in our database:
        for ($i = 0; $i < 50; $i++) {
            User::create([
                'username' =>  str_random(10),
                'firstname' => str_random(10),
                'lastname' =>  str_random(10),
                'password' => bcrypt('secret'),
                'email' => str_random(10).'@gmail.com',
            ]);
        }
    }
}
