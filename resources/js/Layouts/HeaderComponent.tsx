import { Link, usePage } from "@inertiajs/react";
import DashboardLi from "./Partials/Doashboad";
import StaffLi from "./Partials/Staff";
import BillLi from "./Partials/Bill";
import Postforecast from "./Partials/PostForecast";
import CompanyLi from "./Partials/Company";
import FinancialLi from "./Partials/Financial";
import ProjectedResults from "./Partials/projectedResults";
import IndexFinancial from "./Partials/Index-Financial";
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
      className="h-full overflow-y-auto scrollbar-hide"
      style={{
        height: "100%",
        overflowY: "scroll",
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
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
                href="/dashboard"
                className="flex justify-center items-center"
              >
                <img
                  src="https://fintown.software/imgs/logo.png"
                  width={40}
                  height={40}
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
            <ProjectedResults isExpanded={isExpanded} />
          </>
        )}
      </ul>
      <ul className="my-16">
        <li className="hover:bg-accent-color-sub mt-auto ml-2 p-2 rounded-xl text-text-head hover:text-white transition duration-300 cursor-pointer">
          <div className="flex items-center">
            {isExpanded ? (
              <Link
                href="/projected-results"
                className="flex justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-sun"
                >
                  {" "}
                  <circle cx={12} cy={12} r={4} /> <path d="M12 2v2" />{" "}
                  <path d="M12 20v2" /> <path d="m4.93 4.93 1.41 1.41" />{" "}
                  <path d="m17.66 17.66 1.41 1.41" /> <path d="M2 12h2" />{" "}
                  <path d="M20 12h2" /> <path d="m6.34 17.66-1.41 1.41" />{" "}
                  <path d="m19.07 4.93-1.41 1.41" />{" "}
                </svg>
                <span className="ml-4 text-xs whitespace-nowrap">Màu tối</span>
              </Link>
            ) : (
              <Link href="/projected-results">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-sun"
                >
                  {" "}
                  <circle cx={12} cy={12} r={4} /> <path d="M12 2v2" />{" "}
                  <path d="M12 20v2" /> <path d="m4.93 4.93 1.41 1.41" />{" "}
                  <path d="m17.66 17.66 1.41 1.41" /> <path d="M2 12h2" />{" "}
                  <path d="M20 12h2" /> <path d="m6.34 17.66-1.41 1.41" />{" "}
                  <path d="m19.07 4.93-1.41 1.41" />{" "}
                </svg>
              </Link>
            )}
          </div>
        </li>
        <li className="bg-accent-color hover:bg-accent-color-sub mt-4 ml-2 p-2 rounded-xl text-white transition duration-300 cursor-pointer">
          <div className="flex items-center">
            {isExpanded ? (
              <Link
                href={route("logout")}
                method="post"
                as="button"
                className="flex justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-power"
                >
                  {" "}
                  <path d="M12 7v4" />{" "}
                  <path d="M7.998 9.003a5 5 0 1 0 8-.005" />{" "}
                  <circle cx={12} cy={12} r={10} />{" "}
                </svg>
                <span className="ml-4 text-xs whitespace-nowrap">
                  Đăng xuất
                </span>
              </Link>
            ) : (
              <Link href={route("logout")} method="post" as="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-power"
                >
                  {" "}
                  <path d="M12 7v4" />{" "}
                  <path d="M7.998 9.003a5 5 0 1 0 8-.005" />{" "}
                  <circle cx={12} cy={12} r={10} />{" "}
                </svg>
              </Link>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}
