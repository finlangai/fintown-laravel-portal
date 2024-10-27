import ConfirmDelete from "@/Components/Specialized/confirm-delete";
import { InfoField } from "@/Components/Specialized/info-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/UI/card";
import { cn } from "@/Lib/utils";
import EditBackjob from "./EditBackjob";

const BackjobCard = (backjob: Backjob) => {
  const {
    id,
    name,
    is_active,
    description,
    interval,
    time,
    cron_expression,
    last_run,
    next_run,
  } = backjob;

  return (
    <Card className="flex flex-col justify-between shadow-md">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-lg text-slate-700">
          <span>{name}</span>
          <span
            className={cn(
              "size-4 rounded-full shadow-sm border",
              is_active ? "bg-green-400" : "bg-gray-400",
            )}
          ></span>
        </CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {/* Interval Info */}
        <div className="flex gap-4">
          {cron_expression ? (
            <InfoField name="Cron Expression" value={cron_expression} />
          ) : (
            <>
              <InfoField name="Interval" value={interval} />
              <InfoField name="Time" value={time} />
            </>
          )}
        </div>
        {/* RUN TIMESTAMPS */}
        <div className="flex gap-4">
          <InfoField
            name="Last run"
            value={last_run ? new Date(last_run).toLocaleString() : "Not yet"}
          />
          <InfoField
            name="Next run"
            value={next_run ? new Date(next_run).toLocaleString() : "Not yet"}
          />
        </div>
        {/* Last & Next run */}
      </CardContent>
      <CardFooter className="flex justify-end items-center gap-3">
        <EditBackjob {...backjob} />
        <ConfirmDelete destroyUrl={route("system.backjobs.destroy", id)} />
      </CardFooter>
    </Card>
  );
};

export default BackjobCard;
