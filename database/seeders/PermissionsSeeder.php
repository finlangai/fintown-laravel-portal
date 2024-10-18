<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            // quản lý user 
            'view_users',
            'create_users',
            'edit_users',
            'delete_users',
            // quản lý hóa đơn 
            'view_bill',
            'create_bill',
            'edit_bill',
            'delete_bill',
            // sản phẩm và dịch vụ 
            'view_products_services',
            'create_products_services',
            'edit_products_services',
            'delete_products_services',
            // quản lý công ty 
            'view_company',
            'create_company',
            'edit_company',
            'delete_company',
            // Quản lý tài chính
            'view_financial',
            'create_financial',
            'edit_financial',
            'delete_financial',
            // quản lý chỉ số tài chính 
            'view_financial_index',
            'create_financial_index',
            'edit_financial_index',
            'delete_financial_index',
            // kết quả dự phóng
            'view_Projected_results',
            'create_Projected_results',
            'edit_Projected_results',
            'delete_Projected_results',
        ];
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }
    }
}
