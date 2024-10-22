import { Badge } from "@/Components/UI/badge";
import {
  TypographyInlineCode,
  TypographyMuted,
  TypographyP,
} from "@/Components/UI/typography";
import { RotateCcw } from "lucide-react";

const InfoTopbar = ({
  assessment,
}: {
  assessment: Assessment & { company: Company };
}) => {
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

  return (
    <div className="flex justify-between shadow-md p-5 rounded-lg w-full">
      <div className="flex flex-col justify-between gap-2">
        {/* regenerate button */}
        <button className="flex items-center gap-3 border-[2px] border-orange-300 px-2 py-1 rounded-md !ring-0 w-fit h-fit font-bold text-center text-orange-400 text-sm outline-none">
          <RotateCcw className="size-5" />
          Cập nhật nhận định
        </button>

        <div className="flex gap-3">
          <Badge variant="secondary">Tồn tại {clusterCount} nhóm</Badge>
          <Badge variant="secondary">Được dự đoán {metricCount} chỉ số</Badge>
        </div>
      </div>
      {/* COMPANY INFO */}
      <div className="flex items-center gap-3">
        {/* COMPANY NAME */}
        <div className="flex flex-col gap-1 text-end">
          <TypographyP className="max-w-[360px] font-medium text-nowrap text-slate-800 overflow-x-hidden">
            {assessment.company.company_name}
          </TypographyP>
          <TypographyMuted>{assessment.company.industry}</TypographyMuted>
        </div>
        {/* COMPANY LOGO */}
        <img
          src={assessment.company.logo}
          className="border-2 p-1 rounded-full w-16 h-16 object-contain"
          alt=""
        />
      </div>
    </div>
  );
};

export default InfoTopbar;
