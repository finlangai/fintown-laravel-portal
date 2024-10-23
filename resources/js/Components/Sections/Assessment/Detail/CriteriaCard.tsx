import { useAssessmentDetail } from "@/Contexts/AssessmentDetailContext";
import { cn } from "@/Lib/utils";
import { ReactNode } from "react";

interface CriteriaCardInterface {
  name: string;
  slug: string;
  isActive: boolean;
  icon: ReactNode;
  setCurrentCriteria: (slug: string) => void;
  className?: string;
}

const CriteriaCard = ({
  name,
  slug,
  isActive,
  icon,
  setCurrentCriteria,
  className,
}: CriteriaCardInterface) => {
  const { setClusterIndex } = useAssessmentDetail();

  return (
    <button
      className={cn(
        "flex gap-3  px-3 py-4 border rounded-lg transition-all duration-300 ease-out ",
        isActive
          ? "shadow-sm text-white bg-slate-700 bg-opacity-85 gap-9"
          : "hover:bg-slate-50 shadow-md text-slate-700",
        className,
      )}
      onClick={() => {
        setCurrentCriteria(slug);
        setClusterIndex(null);
      }}
    >
      {icon}
      <span className="max-w-full font-bold text-base text-nowrap overflow-x-hidden">
        {name}
      </span>
    </button>
  );
};

export default CriteriaCard;
