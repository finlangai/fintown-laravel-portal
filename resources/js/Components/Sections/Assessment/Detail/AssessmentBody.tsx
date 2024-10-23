import { useAssessmentDetail } from "@/Contexts/AssessmentDetailContext";
import { cn } from "@/Lib/utils";
import CriteriaBody from "./CriteriaBody";
import OverallBody from "./OverallBody";

type AssessmentBodyInterface = {} & classNameInterface;

const AssessmentBody = ({ className }: AssessmentBodyInterface) => {
  const { currentCriteria, overallSlug, insights, forecasts } =
    useAssessmentDetail();

  return (
    <div className={cn("shadow-md h-fit p-5 rounded-lg", className)}>
      <section className="pb-3">
        {currentCriteria == overallSlug ? <OverallBody /> : <CriteriaBody />}
      </section>
    </div>
  );
};

export default AssessmentBody;
