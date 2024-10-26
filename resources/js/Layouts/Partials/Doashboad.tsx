import { Link } from "@inertiajs/react";
interface DashboardLiProps {
   isExpanded: boolean;
 }
const DashboardLi: React.FC<DashboardLiProps> = ({ isExpanded }) => {
   return(
      <li className="p-2 ml-2 text-text-head cursor-pointer rounded-xl  transition duration-300 hover:bg-accent-color hover:text-white">
               <div className="flex items-center">
                  {isExpanded ? (
                     <Link href="/dashboard" className="flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gauge">  <path d="m12 14 4-4" />  <path d="M3.34 19a10 10 0 1 1 17.32 0" />  </svg>
                        <span className="whitespace-nowrap ml-4 text-xs">Bảng điều khiển</span>
                     </Link>
                  ) : (
                    <div className="relative inline-block">
                        <Link href="/dashboard">
                           <svg  xmlns="http://www.w3.org/2000/svg"  width={20}  height={20}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="lucide lucide-gauge"  > <path d="m12 14 4-4" /> <path d="M3.34 19a10 10 0 1 1 17.32 0" /> </svg>
                        </Link>
                     </div>
                  )}
               </div>
      </li>
   )
}
export default DashboardLi;