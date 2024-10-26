import { getOverallStatus } from "@/Components/Widgets/OverallStatusBar";
import { useAssessmentDetail } from "@/Contexts/AssessmentDetailContext";
import { cn } from "@/Lib/utils";
import { Badge } from "lucide-react";
import { TbCapsuleFilled } from "react-icons/tb";
import CriteriaCard from "./CriteriaCard";

type AssessmentCriteriasProps = {} & classNameInterface;

const AssessmentCriterias = ({ className }: AssessmentCriteriasProps) => {
  const {
    currentCriteria,
    setCurrentCriteria,
    overallSlug,
    overallTitle,
    criterias,
    insights,
    positiveCriteriaCount,
    criteriasCount,
  } = useAssessmentDetail();

  const { color } = getOverallStatus(positiveCriteriaCount, criteriasCount);

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
              style={
                currentCriteria == overallSlug
                  ? { fill: "white", stroke: "white" }
                  : { fill: color, stroke: color }
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
