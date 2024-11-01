import { X } from "lucide-react";
import { FC } from "react";

type IndicatorTagProps = {
  indicatorName?: string;
  removeHandler: Function;
};
const IndicatorTag: FC<IndicatorTagProps> = ({
  indicatorName,
  removeHandler,
}) => {
  return (
    <span
      className="flex items-center gap-1 border-slate-200 px-2 py-1 border rounded-sm font-bold text-slate-600 text-xs cursor-pointer"
      onClick={() => removeHandler()}
    >
      <X className="size-3 stroke-[3px]" /> {indicatorName}
    </span>
  );
};

export default IndicatorTag;
