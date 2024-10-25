import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/Components/UI/tooltip";
import { ReactNode } from "react";

type TooltipWrapperProps = {
  children: ReactNode;
  tooltip: ReactNode | string | number;
} & classNameInterface &
  styleInterface;

const TooltipWrapper = ({
  children,
  tooltip,
  className,
  style,
}: TooltipWrapperProps) => {
  return (
    <Tooltip>
      <TooltipTrigger style={style} className={className}>
        {children}
      </TooltipTrigger>
      {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
    </Tooltip>
  );
};

export default TooltipWrapper;
