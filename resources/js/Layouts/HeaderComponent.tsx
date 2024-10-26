import { Link, usePage } from "@inertiajs/react";
import BillLi from "./Partials/Bill";
import CompanyLi from "./Partials/Company";
import DashboardLi from "./Partials/Doashboad";
import FinancialLi from "./Partials/Financial";
import IndexFinancial from "./Partials/Index-Financial";
import Postforecast from "./Partials/PostForecast";
import ProjectedResults from "./Partials/projectedResults";
import StaffLi from "./Partials/Staff";
interface HeaderComponentProps {
   isExpanded: boolean;
   handleSetIsExpanded: (value: boolean) => void;
}

export default function HeaderComponent({ isExpanded, handleSetIsExpanded }: HeaderComponentProps) {
   const activeNavLink = { 
      color: "#25B770 ",
   };
   const { userPermissionsAndRoles } : any= usePage().props;
   const permissions = userPermissionsAndRoles.permissions || [];
   const superAdmin = userPermissionsAndRoles.isSuperAdmin || false;
   const admin = userPermissionsAndRoles.isAdmin || false;
   const hasPermission = (permission: string) => {
      return superAdmin || permissions.includes(permission);
   };
   return (
      <div className="h-full overflow-y-auto  scrollbar-hide"style={{
         height: '100%',
         overflowY: 'scroll',
         scrollbarWidth: 'none', 
         WebkitOverflowScrolling: 'touch', 
       }}> 
         <ul className="flex flex-col space-y-4 mt-5">
            {/* cả admin và supper ADMIN đều sử dụng được  */}
            <li className="p-2 ml-2 text-text-head cursor-pointer" onClick={() => handleSetIsExpanded(true)} style={activeNavLink}>
               <div className="flex items-center h-10">
                  {isExpanded ? ( 
                     <Link href="/" className="flex justify-center items-center">
                        <img src="https://fintown.software/imgs/logo.png" width={40} height={40} alt="MenuLogo" className="block rounded-full shadow-lg" style={{marginLeft : "-3px"}}/>
                        <p className="items-center font-semibold text-2xl text-white ml-3">FinTown</p>
                     </Link>
                  ) : (
                     <img src="https://fintown.software/imgs/logo.png" width={30} height={30} alt="MenuLogo" className="block rounded-full shadow-lg" style={{marginLeft : "-3px"}}/>
                     
                  )}
               </div>
            </li>
            <DashboardLi isExpanded={isExpanded}/>
           
            {/* Mọi quyền cho super admin */}
            {superAdmin && (
               <>
                  <StaffLi isExpanded={isExpanded}/>
                  <BillLi isExpanded={isExpanded}/>
                  <Postforecast isExpanded={isExpanded}/>
               </>
            )}
         </ul>
         <ul className="flex flex-col space-y-4 mt-5">            
            {superAdmin && (
               <>
                     <CompanyLi isExpanded={isExpanded}/>
                     <FinancialLi isExpanded={isExpanded}/>
                     <IndexFinancial isExpanded={isExpanded}/>
                     <ProjectedResults isExpanded={isExpanded}/>
               </>
            )}
         </ul>
         <ul className="my-16"> 
            <li className="p-2 ml-2 text-text-head cursor-pointer rounded-xl  hover:text-white transition duration-300 hover:bg-accent-color-sub mt-auto">
               <div className="flex items-center">
                  {isExpanded ? (
                     <Link href="/projected-results" className="flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun" > <circle cx={12} cy={12} r={4} /> <path d="M12 2v2" /> <path d="M12 20v2" /> <path d="m4.93 4.93 1.41 1.41" /> <path d="m17.66 17.66 1.41 1.41" /> <path d="M2 12h2" /> <path d="M20 12h2" /> <path d="m6.34 17.66-1.41 1.41" /> <path d="m19.07 4.93-1.41 1.41" /> </svg>
                        <span className="whitespace-nowrap ml-4 text-xs">Màu tối</span>
                     </Link>
                  ) : (
                     <Link href="/projected-results">
                       <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun" > <circle cx={12} cy={12} r={4} /> <path d="M12 2v2" /> <path d="M12 20v2" /> <path d="m4.93 4.93 1.41 1.41" /> <path d="m17.66 17.66 1.41 1.41" /> <path d="M2 12h2" /> <path d="M20 12h2" /> <path d="m6.34 17.66-1.41 1.41" /> <path d="m19.07 4.93-1.41 1.41" /> </svg>
                     </Link>
                  )}
               </div>
            </li>
            <li className="p-2 ml-2 cursor-pointer rounded-xl  text-white transition duration-300 bg-accent-color hover:bg-accent-color-sub mt-4">
               <div className="flex items-center">
                  {isExpanded ? (
                     <Link  href={route("logout")}  method="post" as="button" className="flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-power" > <path d="M12 7v4" /> <path d="M7.998 9.003a5 5 0 1 0 8-.005" /> <circle cx={12} cy={12} r={10} /> </svg>
                        <span className="whitespace-nowrap ml-4 text-xs">Đăng xuất</span>
                     </Link>
                  ) : (
                     <Link href={route("logout")}  method="post" as="button">
                     <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-power" > <path d="M12 7v4" /> <path d="M7.998 9.003a5 5 0 1 0 8-.005" /> <circle cx={12} cy={12} r={10} /> </svg>
                     </Link>
                  )}
               </div>
            </li>
         </ul>
      </div>
   );
}
