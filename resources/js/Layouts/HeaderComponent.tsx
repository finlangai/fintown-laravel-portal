import { useSideMenu } from "@/Contexts/SideMenuContext";
import { cn } from "@/Lib/utils";
import { PageProps } from "@/Types";
import { Link, usePage } from "@inertiajs/react";
import { ChevronsLeft, ChevronsRight, CirclePower } from "lucide-react";
import AssessmentMenuItems from "./Partials/AssessmentMenuItems";
import CompanyLi from "./Partials/Company";
import DashboardLi from "./Partials/Doashboad";
import FinancialLi from "./Partials/Financial";
import InternalMenuItem from "./Partials/InternalMenuItem";
import SubscriptionMenuItems from "./Partials/SubscriptionMenuItems";
import SystemMenuItems from "./Partials/SystemMenuItems";
import UsersMenuItems from "./Partials/UsersMenuItems";
interface HeaderComponentProps {}

type HeaderComponentPageProps = {
  userPermissionAndRoles: {
    isSuperAdmin: boolean;
    permissions: string[];
    roles: string[];
  };
} & PageProps;

export default function HeaderComponent({}: HeaderComponentProps) {
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

  const { isMenuExpanded, setIsMenuExpanded } = useSideMenu();

  return (
    <>
      <header
        className={`bg-background-sibar sticky top-0 shadow max-h-screen ${isMenuExpanded ? "w-60" : "w-20"} transition-all duration-300 ease-in-out`}
        // onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="relative px-3 w-full h-full max-h-screen">
          {/* === START - HEADER INNER  */}
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
              <ul className="flex flex-col gap-4 mt-5">
                {/* cả admin và supper ADMIN đều sử dụng được  */}
                <li
                  className={cn(
                    "flex p-2 text-text-head cursor-pointer mb-8",
                    !isMenuExpanded && "justify-center",
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
                        width={isMenuExpanded ? 45 : 30}
                        height={isMenuExpanded ? 45 : 30}
                        alt="MenuLogo"
                        className="rounded-full transition-all duration-300 ease-out"
                      />
                      {isMenuExpanded && (
                        <p className="items-center font-bold text-2xl text-white">
                          fintown
                        </p>
                      )}
                    </Link>
                  </div>
                </li>

                <DashboardLi isExpanded={isMenuExpanded} />

                {/* Mọi quyền cho super admin */}
                {/* <BillLi isExpanded={isMenuExpanded} /> */}
                {/* <Postforecast isExpanded={isMenuExpanded} /> */}
                {hasPermission("user-read") && <UsersMenuItems />}
                {hasPermission("company-read") && (
                  <CompanyLi isExpanded={isMenuExpanded} />
                )}

                {hasPermission("financial-read") && (
                  <FinancialLi isExpanded={isMenuExpanded} />
                )}

                {/* <IndexFinancial isExpanded={isMenuExpanded} /> */}
                {hasPermission("subscription_program-read") && (
                  <SubscriptionMenuItems isExpanded={isMenuExpanded} />
                )}
                {hasPermission("assessment-read") && (
                  <AssessmentMenuItems isExpanded={isMenuExpanded} />
                )}
                {hasPermission("staff-read") && (
                  <InternalMenuItem isExpanded={isMenuExpanded} />
                )}

                {superAdmin && <SystemMenuItems isExpanded={isMenuExpanded} />}
              </ul>
            </div>

            {/* POWER BUTTON */}
            <ul className="mt-4 mb-12 w-full">
              <li className="bg-red-400 hover:bg-red-500 mx-1 mt-4 p-2 rounded-xl text-white transition duration-300 cursor-pointer">
                <div
                  className={cn(
                    "flex items-center",
                    !isMenuExpanded && "justify-center",
                  )}
                >
                  <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="flex justify-center items-center"
                  >
                    <CirclePower />
                    {isMenuExpanded && (
                      <span className="ml-4 text-xs whitespace-nowrap">
                        Đăng xuất
                      </span>
                    )}
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          {/* === END - HEADER INNER  */}

          {/* === START - OPEN AND CLOSE MENU BUTTON */}
          <div className="top-1/2 -right-3 absolute">
            <button
              onClick={() => {
                setIsMenuExpanded(!isMenuExpanded);
              }}
              className="bg-background-sibar py-3 rounded-2xl"
            >
              {isMenuExpanded ? (
                <ChevronsLeft className="stroke-text-active" />
              ) : (
                <ChevronsRight className="stroke-text-active" />
              )}
            </button>
          </div>
          {/* END - OPEN AND CLOSE MENU BUTTON === */}
        </div>
      </header>
    </>
  );
}
