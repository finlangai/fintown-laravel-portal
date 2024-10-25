type Backjob = {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
  parameters: string;
  job_class: string;
  interval: number;
  interval_type: "minutely" | "hourly" | "daily" | "weekly" | "monthly";
  time: string;
  last_run: string | null;
  next_run: string | null;
  created_at: string;
  updated_at: string;
};
