<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleHasPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissionsNames = [
            // quản lý user
            "view_users",
            "create_users",
            "edit_users",
            "delete_users",

            // quản lý hóa đơn
            "view_bill",
            "create_bill",
            "edit_bill",
            "delete_bill",

            // sản phẩm và dịch vụ
            "view_products_services",
            "create_products_services",
            "edit_products_services",
            "delete_products_services",

            // quản lý công ty
            "view_company",
            "create_company",
            "edit_company",
            "delete_company",

            // Quản lý tài chính
            "view_financial",
            "create_financial",
            "edit_financial",
            "delete_financial",

            // quản lý chỉ số tài chính
            "view_financial_index",
            "create_financial_index",
            "edit_financial_index",
            "delete_financial_index",

            // kết quả dự phóng
            "view_projected_results",
            "create_projected_results",
            "edit_projected_results",
            "delete_projected_results",
        ];

        $permissions = Permission::whereIn("name", $permissionsNames)->get();

        $role = Role::where("name", "super-admin")->first();

        if ($role) {
            $role->givePermissionTo($permissions);
        }
    }
}
