import { Link, usePage } from "@inertiajs/react";
import DashboardLi from "./Partials/Doashboad";
import StaffLi from "./Partials/Staff";
import BillLi from "./Partials/Bill";
import Postforecast from "./Partials/PostForecast";
import CompanyLi from "./Partials/Company";
import FinancialLi from "./Partials/Financial";
import AssessmentMenuItems from "./Partials/AssessmentMenuItems";
import IndexFinancial from "./Partials/Index-Financial";
import { CirclePower } from "lucide-react";
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
            className="ml-2 p-2 text-text-head cursor-pointer"
            onClick={() => handleSetIsExpanded(true)}
            style={activeNavLink}
          >
            <div className="flex items-center h-10">
              {isExpanded ? (
                <Link
                  href={route("dashboard")}
                  className="flex justify-center items-center"
                >
                  <img
                    src="https://fintown.software/imgs/logo.png"
                    width={50}
                    height={50}
                    alt="MenuLogo"
                    className="block shadow-lg rounded-full"
                    style={{ marginLeft: "-3px" }}
                  />
                  <p className="items-center ml-3 font-semibold text-2xl text-white">
                    Fintown
                  </p>
                </Link>
              ) : (
                <img
                  src="https://fintown.software/imgs/logo.png"
                  width={30}
                  height={30}
                  alt="MenuLogo"
                  className="block shadow-lg rounded-full"
                  style={{ marginLeft: "-3px" }}
                />
              )}
            </div>
          </li>
          <DashboardLi isExpanded={isExpanded} />

          {/* Mọi quyền cho super admin */}
          {superAdmin && (
            <>
              <StaffLi isExpanded={isExpanded} />
              <BillLi isExpanded={isExpanded} />
              <Postforecast isExpanded={isExpanded} />
            </>
          )}
        </ul>
        <ul className="flex flex-col space-y-4 mt-5">
          {superAdmin && (
            <>
              <CompanyLi isExpanded={isExpanded} />
              <FinancialLi isExpanded={isExpanded} />
              <IndexFinancial isExpanded={isExpanded} />
              <AssessmentMenuItems isExpanded={isExpanded} />
            </>
          )}
        </ul>
      </div>

      {/* POWER BUTTON */}
      <ul className="mt-4 mb-12 w-full">
        <li className="bg-red-400 hover:bg-red-500 mx-1 mt-4 p-2 rounded-xl text-white transition duration-300 cursor-pointer">
          <div className="flex items-center">
            {isExpanded ? (
              <Link
                href={route("logout")}
                method="post"
                as="button"
                className="flex justify-center items-center"
              >
                <CirclePower />
                <span className="ml-4 text-xs whitespace-nowrap">
                  Đăng xuất
                </span>
              </Link>
            ) : (
              <Link
                href={route("logout")}
                className="mx-auto"
                method="post"
                as="button"
              >
                <CirclePower className="me-[1px]" />
              </Link>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}
