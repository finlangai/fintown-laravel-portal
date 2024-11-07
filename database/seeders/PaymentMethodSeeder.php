<?php

namespace Database\Seeders;

use App\Models\SQL\Payment\PaymentMethod;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $paymentMethods = [["name" => "vnpay"], ["name" => "momo"]];

        foreach ($paymentMethods as $method) {
            PaymentMethod::firstOrCreate($method);
        }
    }
}
