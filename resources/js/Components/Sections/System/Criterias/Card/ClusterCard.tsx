import { Badge } from "@/Components/UI/badge";
import { cn } from "@/Lib/utils";
import { GripVertical, ListTree } from "lucide-react";
import { HTMLAttributes } from "react";

const ClusterCard = ({
  name,
  metrics,
  className,
  ...props
}: CriteriaCluster & HTMLAttributes<HTMLDivElement> & classNameInterface) => {
  const metricsCount = metrics.length;

  return (
    <div
      className={cn(
        "flex justify-between items-center shadow-sm h-[84px] px-5 py-4 border rounded-md cursor-grab group/cluster",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-8">
        <GripVertical className="group-hover/cluster:stroke-teal-300 size-5 stroke-slate-500" />
        <div className="flex flex-col gap-2">
          <span className="font-bold text-slate-600 text-sm">{name}</span>
          <Badge variant="outline" className="w-fit text-slate-500">
            {metricsCount} chỉ số
          </Badge>
        </div>
      </div>

      <button className="group-hover/cluster:px-3 group-hover/cluster:py-2 group-hover/cluster:bg-teal-300 flex items-center gap-2 bg-slate-300 px-2 py-1 rounded-md font-bold text-white text-xs">
        <ListTree className="size-4" /> Chi tiết
      </button>
    </div>
  );
};

export default ClusterCard;
