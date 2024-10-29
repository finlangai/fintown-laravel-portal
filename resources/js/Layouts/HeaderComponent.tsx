import { cn } from "@/Lib/utils";
import { Link, usePage } from "@inertiajs/react";
import { CirclePower } from "lucide-react";
import AssessmentMenuItems from "./Partials/AssessmentMenuItems";
import CompanyLi from "./Partials/Company";
import DashboardLi from "./Partials/Doashboad";
import FinancialLi from "./Partials/Financial";
import StaffLi from "./Partials/Staff";
import SubscriptionMenuItems from "./Partials/SubscriptionMenuItems";
import SystemMenuItems from "./Partials/SystemMenuItems";
interface HeaderComponentProps {
  isExpanded: boolean;
  handleSetIsExpanded: (value: boolean) => void;
}

export default function HeaderComponent({
  isExpanded,
  handleSetIsExpanded,
}: HeaderComponentProps) {
  const activeNavLink = {
    color: "#25B770 ",
  };
  const { userPermissionsAndRoles }: any = usePage().props;
  const permissions = userPermissionsAndRoles.permissions || [];
  const superAdmin = userPermissionsAndRoles.isSuperAdmin || false;
  const admin = userPermissionsAndRoles.isAdmin || false;
  const hasPermission = (permission: string) => {
    return superAdmin || permissions.includes(permission);
  };

  return (
    <div
      className="flex flex-col justify-between w-full h-full font-bold overflow-y-auto scrollbar-hide"
      style={{
        height: "100%",
        overflowY: "scroll",
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* MENU ITEM CONTAINER */}
      <div className="flex flex-col overflow-y-scroll">
        <ul className="flex flex-col space-y-4 mt-5">
          {/* cả admin và supper ADMIN đều sử dụng được  */}
          <li
            className={cn(
              "flex p-2 text-text-head cursor-pointer",
              !isExpanded && "justify-center",
            )}
            style={activeNavLink}
          >
            <div className="flex items-center h-10">
              <Link
                href={route("dashboard")}
                className="flex items-center gap-2"
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fintown-4ddd6.appspot.com/o/logo%2Ffintown-logo.png?alt=media"
                  width={isExpanded ? 45 : 30}
                  height={isExpanded ? 45 : 30}
                  alt="MenuLogo"
                  className="rounded-full transition-all duration-300 ease-out"
                />
                {isExpanded && (
                  <p className="items-center font-bold text-2xl text-white">
                    fintown
                  </p>
                )}
              </Link>
            </div>
          </li>
          <DashboardLi isExpanded={isExpanded} />

          {/* Mọi quyền cho super admin */}
          {superAdmin && (
            <>
              <StaffLi isExpanded={isExpanded} />
              {/* <BillLi isExpanded={isExpanded} /> */}
              {/* <Postforecast isExpanded={isExpanded} /> */}
            </>
          )}
        </ul>
        <ul className="flex flex-col space-y-4">
          {superAdmin && (
            <>
              <CompanyLi isExpanded={isExpanded} />
              <FinancialLi isExpanded={isExpanded} />
              {/* <IndexFinancial isExpanded={isExpanded} /> */}
              <SubscriptionMenuItems isExpanded={isExpanded} />
              <AssessmentMenuItems isExpanded={isExpanded} />
              <SystemMenuItems isExpanded={isExpanded} />
            </>
          )}
        </ul>
      </div>

      {/* POWER BUTTON */}
      <ul className="mt-4 mb-12 w-full">
        <li className="bg-red-400 hover:bg-red-500 mx-1 mt-4 p-2 rounded-xl text-white transition duration-300 cursor-pointer">
          <div
            className={cn("flex items-center", !isExpanded && "justify-center")}
          >
            <Link
              href={route("logout")}
              method="post"
              as="button"
              className="flex justify-center items-center"
            >
              <CirclePower />
              {isExpanded && (
                <span className="ml-4 text-xs whitespace-nowrap">
                  Đăng xuất
                </span>
              )}
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}
