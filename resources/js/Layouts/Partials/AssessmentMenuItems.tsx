import TooltipWrapper from "@/Components/TooltipWrapper";
import { Link } from "@inertiajs/react";
import { SquareDashedKanban } from "lucide-react";

interface AssessmentMenuItemsProps {
  isExpanded: boolean;
}

const AssessmentMenuItems = ({ isExpanded }: AssessmentMenuItemsProps) => {
  return (
    <li className="hover:bg-accent-color ml-2 p-2 rounded-xl text-text-head hover:text-white transition duration-300 cursor-pointer">
      <div className="flex items-center">
        <TooltipWrapper tooltip={!isExpanded ? "Kết quả nhận định" : null}>
          <Link
            href={route("assessments.index")}
            className="flex justify-center items-center"
          >
            <SquareDashedKanban />
            {isExpanded && (
              <span className="ml-4 text-xs whitespace-nowrap">
                Kết quả nhận định
              </span>
            )}
          </Link>
        </TooltipWrapper>
      </div>
    </li>
  );
};

export default AssessmentMenuItems;
