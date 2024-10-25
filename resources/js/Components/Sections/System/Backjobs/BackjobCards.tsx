import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/UI/card";
import { useBackjobsPage } from "@/Contexts/BackjobsPageContext";
import { cn } from "@/Lib/utils";

const BackjobCards = () => {
  const { backjobs } = useBackjobsPage();

  return (
    <>
      {backjobs.map(
        (
          {
            name,
            is_active,
            description,
            interval,
            interval_type,
            time,
            last_run,
            next_run,
          },
          index,
        ) => (
          <Card key={index} className="flex flex-col justify-between shadow-md">
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
              <CardDescription className="text-xs">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {/* Interval Info */}
              <div className="flex gap-4">
                <p className="font-bold text-base text-slate-600">
                  <span className="font-medium text-slate-500 text-sm">
                    Interval:{" "}
                  </span>
                  {interval}
                </p>
                <p className="font-bold text-base text-slate-600">
                  <span className="font-medium text-slate-500 text-sm">
                    Interval Type:{" "}
                  </span>
                  {interval_type}
                </p>
                <p className="font-bold text-base text-slate-600">
                  <span className="font-medium text-slate-500 text-sm">
                    Time:{" "}
                  </span>
                  {time}
                </p>
              </div>
              <div className="flex gap-4">
                <p className="font-bold text-base text-slate-600">
                  <span className="font-medium text-slate-500 text-sm">
                    Last run:{" "}
                  </span>
                  {last_run ? new Date(last_run).toLocaleString() : "Not yet"}
                </p>
                <p className="font-bold text-base text-slate-600">
                  <span className="font-medium text-slate-500 text-sm">
                    Next run:{" "}
                  </span>
                  {next_run ? new Date(next_run).toLocaleString() : "Not yet"}
                </p>
              </div>
              {/* Last & Next run */}
              <div></div>
            </CardContent>
            <CardFooter className="flex justify-end items-center gap-3">
              <button className="bg-blue-400 px-3 py-2 rounded-md font-bold text-sm text-white">
                Chỉnh sửa
              </button>
              <button className="bg-red-400 px-3 py-2 rounded-md font-bold text-sm text-white">
                Gỡ bỏ
              </button>
            </CardFooter>
          </Card>
        ),
      )}
    </>
  );
};

export default BackjobCards;
