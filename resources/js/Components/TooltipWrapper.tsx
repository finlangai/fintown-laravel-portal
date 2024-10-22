import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/Components/UI/tooltip";
import { ReactNode } from "react";

interface TooltipWrapperProps {
  children: ReactNode;
  tooltip: ReactNode | string | number;
}

const TooltipWrapper = ({ children, tooltip }: TooltipWrapperProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
    </Tooltip>
  );
};

export default TooltipWrapper;
