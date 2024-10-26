<?php

namespace App\Jobs;

use App\Services\PythonService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class CallPythonService implements ShouldQueue
{
    use Queueable;
    private PythonService $pythonService;
    protected $parameters;
    /**
     * Create a new job instance.
     */
    public function __construct($parameters)
    {
        $this->parameters = json_decode($parameters, true);
        $this->pythonService = new PythonService();
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->pythonService->instantPOST($this->parameters["endpoint"]);
        return;
    }
}
