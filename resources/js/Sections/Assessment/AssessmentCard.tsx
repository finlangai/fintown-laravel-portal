import { Separator } from "@/Components/UI/separator";
import { TbCapsuleFilled } from "react-icons/tb";
import { assessmentGroupsSummary } from "./assessmentGroupsSummary";

interface AssessmentCardProps {
  company: Company;
  insights: AssessmentInsights;
  updated_at: string;
}

const AssessmentCard = ({
  company,
  insights,
  updated_at,
}: AssessmentCardProps) => {
  return (
    <div className="bg-slate-50 shadow-md p-4 rounded-lg">
      {/* == START CARD HEAD */}
      <div id="card-head" className="flex gap-2">
        {/* LOGO */}
        <div id="logo" className="rounded-full">
          <img
            className="object-contain size-12"
            src={company.logo}
            alt={company.symbol}
          />
        </div>

        {/* CARD TITLE */}
        <div className="flex flex-col flex-1 gap-1 text-start">
          <div className="flex justify-between font-bold text-lg text-slate-900">
            <span>{company.symbol}</span>
            <span className="flex">
              {/* STATUS LIGHTS */}
              {Object.values(insights).map((item) => {
                if (typeof item === "object") {
                  const colorClassname =
                    item.status == "Tích cực"
                      ? "fill-green-400"
                      : "fill-red-400";
                  return (
                    <TbCapsuleFilled className={`${colorClassname} w-fit`} />
                  );
                }
              })}
            </span>
          </div>
          {/* COMPANY NAME */}
          <span className="line-clamp-1 text-slate-500 text-sm">
            {company.company_name}
          </span>
        </div>
      </div>
      {/* END CARD HEAD == */}
      <Separator className="mt-5 mb-3" />
      {/* == START CARD FOOTER */}

      <div id="card-footer" className="flex justify-between items-center">
        <span className="text-slate-400 text-xs">
          Lần cuối cập nhật {new Date(updated_at).toLocaleString()}
        </span>
        {assessmentGroupsSummary(insights)}
      </div>
      {/* END CARD FOOTER == */}
    </div>
  );
};

export default AssessmentCard;
