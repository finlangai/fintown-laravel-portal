<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class TruncateTable extends Command
{
    protected $signature   = 'table:truncate {table}';
    protected $description = 'Truncate a specified table';

    public function handle()
    {
        $table = $this->argument('table');
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table($table)->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        $this->info("Table {$table} truncated successfully.");
    }
}
