import { useTerminal } from "@/Hooks/useTerminal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/Components/UI/tooltip";
import { Dot, SquareTerminal } from "lucide-react";

const TerminalToggleButton = () => {
  const { toggleTerminal, isClosed } = useTerminal();
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="relative cursor-pointer">
          <SquareTerminal
            className="size-8 stroke-slate-500"
            onClick={toggleTerminal}
          />
          <span
            className={`top-0 right-0 absolute rounded-full size-[10px] ${isClosed ? "bg-orange-400" : "bg-green-400"}`}
          ></span>
        </div>
      </TooltipTrigger>
      <TooltipContent>Terminal</TooltipContent>
    </Tooltip>
  );
};

export default TerminalToggleButton;
