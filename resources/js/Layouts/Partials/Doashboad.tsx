import { Link } from "@inertiajs/react";
import { SquareChartGantt } from "lucide-react";
interface DashboardLiProps {
  isExpanded: boolean;
}
const DashboardLi: React.FC<DashboardLiProps> = ({ isExpanded }) => {
  return (
    <li className="hover:bg-accent-color ml-2 p-2 rounded-xl text-text-head hover:text-white transition duration-300 cursor-pointer">
      <div className="flex items-center">
        <Link href="/dashboard" className="flex justify-center items-center">
          <SquareChartGantt className="size-6" />
          {isExpanded && (
            <span className="ml-4 text-xs whitespace-nowrap">Tổng quan</span>
          )}
        </Link>
      </div>
    </li>
  );
};
export default DashboardLi;
