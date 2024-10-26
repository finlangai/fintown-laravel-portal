<?php

namespace App\Jobs;

use App\Services\PythonService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class UpdateDailyStats implements ShouldQueue
{
    use Queueable;
    private PythonService $pythonService;

    protected $parameters;
    /**
     * Create a new job instance.
     */
    public function __construct($parameters)
    {
        $this->parameters = $parameters;
        $this->pythonService = new PythonService();
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->pythonService->instantPOST("refresh/stash_stats");
    }
}
