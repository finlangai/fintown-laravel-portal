import { useAssessmentDetail } from "@/Contexts/AssessmentDetailContext";
import { cn } from "@/Lib/utils";
import { useEffect } from "react";
import CriteriaBody from "./CriteriaBody";
import OverallBody from "./OverallBody";

type AssessmentBodyInterface = {} & classNameInterface;

const AssessmentBody = ({ className }: AssessmentBodyInterface) => {
  const { currentCriteria, overallSlug, clusterIndex } = useAssessmentDetail();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentCriteria, clusterIndex]);

  return (
    <div className={cn("shadow-md h-fit p-5 rounded-lg pb-3", className)}>
      {currentCriteria == overallSlug ? <OverallBody /> : <CriteriaBody />}
    </div>
  );
};

export default AssessmentBody;
