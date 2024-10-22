import { cn } from "@/Lib/utils";
import { TbCapsuleFilled } from "react-icons/tb";
import CriteriaCard from "./CriteriaCard";
import { Badge } from "lucide-react";

type AssessmentCriteriasProps = {
  criterias: Criteria[];
  insights: AssessmentInsights;
  currentCriteria: string;
  setCurrentCriteria: (slug: string) => void;
} & classNameInterface;

const AssessmentCriterias = ({
  criterias,
  insights,
  currentCriteria,
  setCurrentCriteria,
  className,
}: AssessmentCriteriasProps) => {
  const overallSlug = "overall";
  const overallTitle = "Nhận Định Tổng Quan";
  return (
    <section className={cn("px-3 rounded-lg w-1/4", className)}>
      {/* === START - CRITERIAS LIST */}
      <div className="flex flex-col gap-3">
        {/* OVERALL CARD */}
        <CriteriaCard
          name={overallTitle}
          slug={overallSlug}
          isActive={currentCriteria == overallSlug}
          setCurrentCriteria={setCurrentCriteria}
          icon={
            <Badge
              className={
                currentCriteria == overallSlug
                  ? "fill-white stroke-white"
                  : "fill-purple-400 stroke-purple-400"
              }
            />
          }
          className="mb-4"
        />
        {/* CRITERIAS CARDS */}
        {criterias.map((criteriaInfo, index) => (
          <CriteriaCard
            key={index}
            name={criteriaInfo.name}
            slug={criteriaInfo.slug}
            isActive={currentCriteria == criteriaInfo.slug}
            setCurrentCriteria={setCurrentCriteria}
            icon={
              <TbCapsuleFilled
                className={cn(
                  "size-6",
                  insights[criteriaInfo.slug].status == "Tích cực"
                    ? "fill-green-400"
                    : "fill-red-400",
                  currentCriteria == criteriaInfo.slug
                    ? "!fill-white !stroke-white"
                    : null,
                )}
              />
            }
          />
        ))}
      </div>

      {/* END - CRITERIAS LIST === */}
    </section>
  );
};

export default AssessmentCriterias;
