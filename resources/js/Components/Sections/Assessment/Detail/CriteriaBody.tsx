import { TypographyH5 } from "@/Components/UI/typography";
import { useAssessmentDetail } from "@/Contexts/AssessmentDetailContext";
import { cn } from "@/Lib/utils";

type CriteriaBodyInterface = {} & classNameInterface;

const CriteriaBody = ({}: CriteriaBodyInterface) => {
  const { currentCriteria, clusterIndex, insights, getCriteriaInfo } =
    useAssessmentDetail();
  const criteriaInfo = getCriteriaInfo(currentCriteria);
  const status = insights[currentCriteria].status;
  const isPositive = status == "Tích cực";

  const criteriaInsight = insights[currentCriteria];
  const isDisplayingCluster = typeof clusterIndex == "number";
  const bodyHeaderProps: CriteriaBodyHeaderProps = {
    assessOf: isDisplayingCluster ? "nhóm chỉ số" : "tiêu chí",
    isPositive,
    status: isDisplayingCluster
      ? criteriaInsight.groups[clusterIndex]!.status
      : criteriaInsight.status,
    assessmentText: isDisplayingCluster
      ? criteriaInsight.groups[clusterIndex]!.assessment
      : criteriaInsight.assessment,
  };
  return (
    <>
      <CriteriaBodyHeader {...bodyHeaderProps} />
    </>
  );
};

interface CriteriaBodyHeaderProps {
  assessOf: string;
  status: string;
  isPositive: boolean;
  assessmentText: string;
}

const CriteriaBodyHeader = ({
  assessOf,
  status,
  isPositive,
  assessmentText,
}: CriteriaBodyHeaderProps) => (
  <>
    <TypographyH5 className="mb-4">
      Đánh giá {assessOf}:{" "}
      <span
        className={cn(
          `px-2 py-1 rounded-md text-base text-white`,
          isPositive ? "bg-green-400" : "bg-red-400",
        )}
      >
        {status}
      </span>
    </TypographyH5>

    <div
      className="p-3 rounded-xl text-slate-600 text-sm leading-6 tracking-wide"
      dangerouslySetInnerHTML={{
        __html: assessmentText,
      }}
    ></div>
  </>
);

export default CriteriaBody;
