import { Separator } from "@/Components/UI/separator";
import { TypographyH5 } from "@/Components/UI/typography";
import OverallStatusBar, {
  getOverallStatus,
} from "@/Components/Widgets/OverallStatusBar";
import { useAssessmentDetail } from "@/Contexts/AssessmentDetailContext";

type OverallBodyInterface = {};

const OverallBody = ({}: OverallBodyInterface) => {
  const { insights, positiveCriteriaCount, criteriasCount } =
    useAssessmentDetail();

  const {
    name: statusName,
    color: statusColor,
    deviation: needleDeviation,
  } = getOverallStatus(positiveCriteriaCount, criteriasCount);

  return (
    <>
      <TypographyH5 className="mb-4">
        Đánh giá tổng quan:{" "}
        <span
          className={`bg-[${statusColor}] px-2 py-1 rounded-md text-base text-white`}
        >
          {statusName}
        </span>
      </TypographyH5>

      <OverallStatusBar level={needleDeviation} />

      <Separator className="mt-9 mb-5" />

      <div
        className="p-3 rounded-xl text-slate-600 text-sm leading-6 tracking-wide"
        dangerouslySetInnerHTML={{ __html: insights.overall }}
      ></div>
    </>
  );
};

export default OverallBody;
