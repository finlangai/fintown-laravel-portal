import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/input";
import { Label } from "@/Components/UI/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/UI/popover";
import { Search } from "lucide-react";

export const FunctionSearch = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative w-[33rem]">
          <Search className="top-1/2 left-0 absolute -translate-y-1/2 size-5 stroke-slate-500" />
          <Input
            className="border-0 shadow-none !ring-0 ps-6"
            placeholder="Tìm kiếm bằng tên chức năng..."
          />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[33rem]">
        <div className="flex flex-col gap-1">
          <h1 className="hover:bg-slate-50 px-2 py-1 rounded-md">
            Damn bro Im one of the functions
          </h1>
          <h1 className="hover:bg-slate-50 px-2 py-1 rounded-md">
            Damn, Im one of the functions too
          </h1>
          <h1 className="hover:bg-slate-50 px-2 py-1 rounded-md">
            GYATTT, Im in here too!?
          </h1>
          <h1 className="hover:bg-slate-50 px-2 py-1 rounded-md">
            What are you guys talking about
          </h1>
        </div>
      </PopoverContent>
    </Popover>
  );
};
