import { Badge } from "@/Components/UI/badge";
import { TypographyMuted, TypographyP } from "@/Components/UI/typography";
import { useAssessmentDetail } from "@/Contexts/AssessmentDetailContext";
import { usePythonService } from "@/Hooks/usePythonService";
import { useTerminal } from "@/Hooks/useTerminal";
import { cn } from "@/Lib/utils";
import { router, usePage } from "@inertiajs/react";
import { RotateCcw } from "lucide-react";

const InfoTopbar = () => {
  const { assessment, isUpdatingAssessment, setIsUpdatingAssessment } =
    useAssessmentDetail();

  let metricCount = 0;
  const clusterCount: number = Object.values(assessment.insights).reduce(
    (acc, item: AssessmentCriteria | string) => {
      // handle overall
      if (typeof item == "string") {
        return acc;
      }
      const currentCount: number = item.groups.reduce((groupAcc, groupItem) => {
        if (!groupItem) return groupAcc;
        metricCount += groupItem.metrics.length;

        return groupAcc + 1;
      }, 0);

      return acc + currentCount;
    },
    0,
  );

  const { writeMessage } = useTerminal();
  const { makeSSERequest } = usePythonService();
  const {
    props: { pythonServiceUrl },
  } = usePage();

  const handleRegenerateAssessment = async () => {
    setIsUpdatingAssessment(!isUpdatingAssessment);
    await makeSSERequest(
      pythonServiceUrl + "/regenerate/assessment",
      (message: string) => writeMessage(message),
      { symbol: assessment.symbol },
    );
    // have it like this because the value is not changing yet
    setIsUpdatingAssessment(isUpdatingAssessment);

    router.visit(route("assessments.show", assessment.symbol), {
      method: "get",
      preserveState: true,
      preserveScroll: true,
    });
  };

  const regenerateButtonClasses = "border-slate-400 bg-slate-400 text-white ";
  return (
    <div className="flex justify-between shadow-md p-5 rounded-lg w-full">
      <div className="flex flex-col justify-between gap-2">
        {/* regenerate button */}
        <div className="flex gap-6">
          <button
            className={cn(
              "flex items-center gap-3 border-[2px]  border-orange-300 px-2 py-1 rounded-md !ring-0 w-fit h-fit font-bold text-center text-orange-400 text-sm outline-none min-w-fit",
              isUpdatingAssessment && regenerateButtonClasses,
            )}
            disabled={isUpdatingAssessment}
            onClick={handleRegenerateAssessment}
          >
            <RotateCcw
              className={cn(
                "size-5",
                isUpdatingAssessment && "animate-reverse-spin",
              )}
            />
            Cập nhật nhận định
          </button>

          <span className="text-slate-600 text-sm">
            Cập nhật lần cuối {new Date(assessment.updated_at).toLocaleString()}
          </span>
        </div>

        <div className="flex gap-3">
          <Badge variant="secondary">Tồn tại {clusterCount} nhóm</Badge>
          <Badge variant="secondary">Được dự đoán {metricCount} chỉ số</Badge>
        </div>
      </div>
      {/* COMPANY INFO */}
      <div className="flex items-center gap-3">
        {/* COMPANY NAME */}
        <div className="flex flex-col gap-1 text-end">
          <TypographyP className="max-w-80 font-medium text-ellipsis text-nowrap text-slate-800 overflow-x-hidden">
            {assessment.company.company_name}
          </TypographyP>
          <TypographyMuted>{assessment.company.industry}</TypographyMuted>
        </div>
        {/* COMPANY LOGO */}
        <img
          src={assessment.company.logo}
          className="border-2 p-1 rounded-full min-w-16 max-w-16 min-h-16 max-h-16 object-contain"
          alt=""
        />
      </div>
    </div>
  );
};

export default InfoTopbar;
