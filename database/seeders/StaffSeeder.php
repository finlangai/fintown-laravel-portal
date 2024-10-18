<?php

namespace Database\Seeders;

use App\Models\SQL\Staff\Staff;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role; 
use Spatie\Permission\Models\ModelHasRole;

class StaffSeeder extends Seeder
{
    public function run(): void
    {
        $superAdminRole = Role::firstOrCreate(['name' => 'super-admin']);

        $superAdmin = Staff::factory()->create([
            'username' => 'Nguyễn Kim Hùng',
            'fullname'  => 'Super Admin User',
            'email' => 'superadmin@example.com',
            'password'=> ('12345678')  
        ]);
        
        $superAdmin->roles()->attach($superAdminRole->id, ['model_type' => Staff::class]);

        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        $admin = Staff::factory()->create([
            'username' => 'Trần gia bảo',
            'fullname'  => 'Admin User',
            'email' => 'admin@example.com',
            'password'=> ('12345678') 
        ]);
        
        $admin->roles()->attach($adminRole->id, ['model_type' => Staff::class]);
    }
}
