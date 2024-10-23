import { cn } from "@/Lib/utils";
import { Play } from "lucide-react";
import { useEffect, useRef } from "react";
import TooltipWrapper from "../TooltipWrapper";

type OverallStatusBarInterface = {
  level: number;
} & classNameInterface;

interface StatusInfo {
  name: string;
  color: string;
  deviation: number;
}
export const OverallStatusBarInfo: StatusInfo[] = [
  { name: "Rất xấu", color: "#FF0000", deviation: 12.5 },
  { name: "Xấu", color: "#FF4560", deviation: 37.5 },
  { name: "Tốt", color: "#00E396", deviation: 62.5 },
  { name: "Rất tốt", color: "#8A47FF", deviation: 87.5 },
];

export const getOverallStatus = (
  positiveCount: number,
  totalCriterias: number,
): StatusInfo => {
  if (positiveCount == 0) return OverallStatusBarInfo[0];
  if (positiveCount == totalCriterias) return OverallStatusBarInfo[3];
  return totalCriterias - positiveCount > totalCriterias / 2
    ? OverallStatusBarInfo[1]
    : OverallStatusBarInfo[2];
};

const OverallStatusBar = ({ level, className }: OverallStatusBarInterface) => {
  const needleRef = useRef(null);
  useEffect(() => {
    if (needleRef.current) {
      const needleEl: HTMLSpanElement = needleRef.current;
      needleEl.style.left = "0%";
      setTimeout(() => {
        needleEl.style.left = `${level}%`;
      }, 50);
    }
  });

  return (
    <div className={cn("relative mb-6", className)}>
      <div className="flex rounded-md w-full h-6 overflow-x-hidden">
        {OverallStatusBarInfo.map(({ name, color }, index) => (
          <TooltipWrapper
            key={index}
            className={`w-1/4 h-full cursor-help`}
            tooltip={name}
            style={{ backgroundColor: color }}
          >
            {null}
          </TooltipWrapper>
        ))}
      </div>
      <span
        className={cn("top-3 absolute transition-all ease-in-out duration-300")}
        ref={needleRef}
      >
        <Play className="-translate-x-1/2 -rotate-90 fill-slate-400 size-8 stroke-slate-400" />
      </span>
    </div>
  );
};

export default OverallStatusBar;
