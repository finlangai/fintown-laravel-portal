type Backjob = {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
  parameters: string;
  job_class: string;
  interval: "minutely" | "hourly" | "daily" | "weekly" | "monthly";
  cron_expression: string | null;
  time: string;
  last_run: string | null;
  next_run: string | null;
  created_at: string;
  updated_at: string;
};
