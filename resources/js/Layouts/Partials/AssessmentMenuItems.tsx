import TooltipWrapper from "@/Components/Specialized/tooltip-wrapper";
import { cn } from "@/Lib/utils";
import { Link } from "@inertiajs/react";
import { SquareDashedKanban } from "lucide-react";

interface AssessmentMenuItemsProps {
  isExpanded: boolean;
}

const AssessmentMenuItems = ({ isExpanded }: AssessmentMenuItemsProps) => {
  return (
    <li
      className={cn(
        "hover:bg-accent-color ml-2 p-2 rounded-xl text-text-head hover:text-white transition duration-300 cursor-pointer",
        !isExpanded && "w-fit",
      )}
    >
      <div className="flex items-center">
        <TooltipWrapper tooltip={!isExpanded ? "Kết quả nhận định" : null}>
          <Link
            href={route("assessments.index")}
            className="flex justify-center items-center"
            preserveState={true}
          >
            <SquareDashedKanban />
            {isExpanded && (
              <span className="ml-4 text-xs whitespace-nowrap">
                Kết quả dự báo
              </span>
            )}
          </Link>
        </TooltipWrapper>
      </div>
    </li>
  );
};

export default AssessmentMenuItems;
