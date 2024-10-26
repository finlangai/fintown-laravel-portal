import {
  AssessmentMetricChart,
  MetricChartInterface,
} from "@/Components/Charts/AssessmentMetricChart";
import { TypographyH5 } from "@/Components/UI/typography";
import { useAssessmentDetail } from "@/Contexts/AssessmentDetailContext";
import { cn } from "@/Lib/utils";

type CriteriaBodyInterface = {} & classNameInterface;

const CriteriaBody = ({}: CriteriaBodyInterface) => {
  const {
    currentCriteria,
    clusterIndex,
    insights,
    metricInfos: metricInfoList,
    forecasts,
  } = useAssessmentDetail();

  const criteriaInsight = insights[currentCriteria];
  let status = insights[currentCriteria].status,
    assessmentText = criteriaInsight.assessment,
    isPositive = status == "Tích cực";

  const isDisplayingCluster: boolean = typeof clusterIndex == "number";
  const requiredCluster = isDisplayingCluster
    ? criteriaInsight.groups[clusterIndex!]
    : null;
  // replace if is displaying cluster
  if (requiredCluster) {
    status = requiredCluster!.status;
    assessmentText = requiredCluster!.assessment;
    isPositive = status == "Tích cực";
  }

  // create props for the body header whether display criteria or just a cluster
  const bodyHeaderProps: CriteriaBodyHeaderProps = {
    assessOf: isDisplayingCluster ? "nhóm chỉ số" : "tiêu chí",
    isPositive,
    status,
    assessmentText,
  };
  return (
    <>
      <CriteriaBodyHeader {...bodyHeaderProps} />
      <div className="flex flex-col gap-3 mt-3">
        {isDisplayingCluster &&
          requiredCluster?.metrics.map((currentIdentifier: string, index) => {
            const metricInfo = metricInfoList.find(
              ({ identifier }) => currentIdentifier == identifier,
            )!;
            const chartData: MetricChartInterface[] = forecasts.map(
              ({ year, metrics }) => ({
                time: year,
                value: metrics[currentIdentifier],
              }),
            );
            return (
              <AssessmentMetricChart
                key={index}
                label={metricInfo.name}
                subLabel={metricInfo.display_name}
                chartData={chartData}
                metricName={metricInfo.display_name}
                metricMetadata={metricInfo.metadata}
              />
            );
          })}
      </div>
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

    {/* ASSESSMENT TEXT BOX */}
    <div
      className="p-3 rounded-xl text-slate-600 text-sm leading-6 tracking-wide"
      dangerouslySetInnerHTML={{
        __html: assessmentText,
      }}
    ></div>
  </>
);

export default CriteriaBody;
