import { Badge } from "@/Components/UI/badge";
import { useCriteriaCard } from "@/Contexts/CriteriaCardContext";
import EditCriteriaClusters from "../EditCriteriaClusters";
import EditCriteriaInfo from "../EditCriteriaInfo";

const CardTrigger = () => {
  const {
    criteriaInfo: { id, name, group, slug, updated_at },
    isClustersDirty,
    clusters,
  } = useCriteriaCard();
  const totalClusters = group.length;
  const totalIndicators = group.reduce(
    (acc, cluster) => cluster.metrics.length + acc,
    0,
  );

  return (
    <div className="flex flex-1 justify-between">
      {/* LEFT BLOCK */}
      <div className="flex flex-col gap-3 [&_*]:transition-all [&_*]:duration-100 [&_*]:ease-out">
        {/* LEFT BLOCK - TITLE */}
        <div className="group-[:not(:has([data-state=open]))]/criterias:group-hover:[&_*]:text-text-active [&>*]:group-data-[state=open]:text-text-active flex items-center gap-3 transition-colors duration-300 ease-out">
          <h3 className="font-bold text-slate-700 text-xl">{name}</h3>
          <p className="text-slate-700 text-sm text-opacity-65">{slug}</p>
        </div>
        {/* LEFT BLOCK - BADGES */}
        <div className="flex gap-2 group-[:not(:has([data-state=open]))]/criterias:group-hover:[&>*]:bg-text-active group-[:not(:has([data-state=open]))]/criterias:group-hover:[&>*]:text-white [&>*]:group-data-[state=open]:text-white [&>*]:group-data-[state=open]:bg-text-active ">
          <Badge variant="secondary" className="!bg-opacity-60">
            {totalClusters} nhóm
          </Badge>
          <Badge variant="secondary" className="!bg-opacity-60">
            {totalIndicators} chỉ số
          </Badge>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end pe-3">
        {updated_at && (
          <p className="text-slate-500 text-xs">
            {new Date(updated_at).toLocaleString()}
          </p>
        )}
        {isClustersDirty ? <EditCriteriaInfo /> : <EditCriteriaClusters />}
      </div>
    </div>
  );
};

export default CardTrigger;
