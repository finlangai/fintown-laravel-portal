<?php

namespace App\Jobs;

use App\Models\SQL\System\Backjob;
use App\Services\PythonService;
use App\Traits\JobTimestamps;
use App\Utils\Logger;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class CallPythonService implements ShouldQueue
{
    use Queueable, JobTimestamps;
    private PythonService $pythonService;
    protected $parameters;
    protected Backjob $jobInfo;
    /**
     * Create a new job instance.
     */
    public function __construct($parameters, $jobId)
    {
        // decode encoded json in array
        $this->parameters = json_decode($parameters, true);
        $this->pythonService = new PythonService();
        $this->jobInfo = Backjob::find($jobId);
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->pythonService->POST($this->parameters["endpoint"]);

        list($last_run, $next_run) = $this->getJobTimestamps();

        $this->jobInfo->fill(compact("last_run", "next_run"));

        $this->jobInfo->save();
    }
}
