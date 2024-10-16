import { Link } from "@inertiajs/react";

interface HeaderComponentProps {
   isExpanded: boolean;
   handleSetIsExpanded: (value: boolean) => void;
}

export default function HeaderComponent({ isExpanded, handleSetIsExpanded }: HeaderComponentProps) {
   const activeNavLink = { 
      color: "#25B770",
   };

   const menuItem = [
      "Bảng điều khiển", "Người dùng", "Hóa đơn", "Sản phẩm và dịch vụ",
   ];

   const menuFiintown = [
      "Hồ sơ công ty", "Báo cáo tài chính", "Chỉ số tài chính", "Kết quả dự phóng"
   ];

   return (
      <div> 
         <ul className="flex flex-col space-y-4 mt-5">
            <li className="p-2 ml-2 text-white cursor-pointer" onClick={() => handleSetIsExpanded(true)} style={activeNavLink}>
               <div className="flex items-center">
                  {isExpanded ? ( 
                     <Link href="/">
                        <p className="items-center font-semibold text-2xl">FiinTown</p>
                     </Link>
                  ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-menu "> 
                        <rect width={18} height={18} x={3} y={3} rx={2} /> 
                        <path d="M7 8h10" /> 
                        <path d="M7 12h10" /> 
                        <path d="M7 16h10" /> 
                     </svg>
                  )}
               </div>
            </li>
            <li className="p-2 ml-2 text-white cursor-pointer">
               <div className="flex items-center">
                  {isExpanded ? (
                     <Link href="/dashboard">
                        <span className="whitespace-nowrap ml-4 text-xs">{menuItem[0]}</span>
                     </Link>
                  ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gauge"> 
                        <path d="m12 14 4-4" /> 
                        <path d="M3.34 19a10 10 0 1 1 17.32 0" /> 
                     </svg>
                  )}
               </div>
            </li>
            <li className="p-2 ml-2 text-white cursor-pointer">
               <div className="flex items-center">
                  {isExpanded ? (
                     <Link href="/staff">
                        <span className="whitespace-nowrap ml-4 text-xs">{menuItem[1]}</span>
                     </Link>
                  ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"> 
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /> 
                        <circle cx={12} cy={7} r={4} />  
                     </svg>
                  )}
               </div>
            </li>
            <li className="p-2 ml-2 text-white cursor-pointer">
               <div className="flex items-center">
                  {isExpanded ? (
                     <span className="whitespace-nowrap ml-4 text-xs">{menuItem[2]}</span>
                  ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-receipt"> 
                        <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /> 
                        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /> 
                        <path d="M12 17.5v-11" /> 
                     </svg>
                  )}
               </div>
            </li>
            <li className="p-2 ml-2 text-white cursor-pointer">
               <div className="flex items-center">
                  {isExpanded ? (
                     <span className="whitespace-nowrap ml-4 text-xs">{menuItem[3]}</span>
                  ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-helping"> 
                        <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" /> 
                        <path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /> 
                        <path d="m2 13 6 6" /> 
                     </svg>
                  )}
               </div>
            </li>
         </ul>
         {isExpanded && <div className="border-t border-transparent" style={{ borderColor: 'rgba(255, 255, 255, 0.3)', height: '1px' }} />}
         <ul className="flex flex-col space-y-4">
            <li className="p-2 ml-2 text-white cursor-pointer" onClick={() => handleSetIsExpanded(true)}>
               <div className="flex items-center">
                  {isExpanded ? ( 
                     <p className="items-center font-semibold text-2xl whitespace-nowrap text-text-Content">Công ty</p>
                  ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building-2"> 
                        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /> 
                        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /> 
                        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /> 
                        <path d="M10 6h4" /> 
                        <path d="M10 10h4" /> 
                        <path d="M10 14h4" /> 
                        <path d="M10 18h4" /> 
                     </svg>
                  )}
               </div>
            </li>
            <li className="p-2 ml-2 text-white cursor-pointer">
               <div className="flex items-center">
                  {isExpanded ? (
                     <Link href="/company">
                        <span className="whitespace-nowrap ml-4 text-xs">{menuFiintown[0]}</span>
                     </Link>
                  ) : (
                     <Link href="/company">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-chart-column-increasing"> 
                           <path d="M21 15v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4" /> 
                           <path d="M5 15v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" /> 
                           <path d="M9 10v4" /> 
                           <path d="M13 6v8" /> 
                           <path d="M17 12v4" /> 
                        </svg>
                     </Link>
                  )}
               </div>
            </li>
            <li className="p-2 ml-2 text-white cursor-pointer">
               <div className="flex items-center">
                  {isExpanded ? (
                     <Link href="/financial">
                        <span className="whitespace-nowrap ml-4 text-xs">{menuFiintown[1]}</span>
                     </Link>
                  ) : (
                     <Link href="/financial">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-chart-pie"> 
                           <path d="M10 2a8 8 0 1 1 6.24 13.74" /> 
                           <path d="M10 2v10l8 4" /> 
                        </svg>
                     </Link>
                  )}
               </div>
            </li>
            <li className="p-2 ml-2 text-white cursor-pointer">
               <div className="flex items-center">
                  {isExpanded ? (
                     <Link href="/financial-indices">
                        <span className="whitespace-nowrap ml-4 text-xs">{menuFiintown[2]}</span>
                     </Link>
                  ) : (
                     <Link href="/financial-indices">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-signal"> 
                           <path d="M3 12h2" /> 
                           <path d="M7 8h2" /> 
                           <path d="M11 4h2" /> 
                           <path d="M15 8h2" /> 
                           <path d="M19 12h2" /> 
                           <path d="M7 16h2" /> 
                           <path d="M11 20h2" /> 
                           <path d="M15 16h2" /> 
                        </svg>
                     </Link>
                  )}
               </div>
            </li>
            <li className="p-2 ml-2 text-white cursor-pointer">
               <div className="flex items-center">
                  {isExpanded ? (
                     <Link href="/forecast">
                        <span className="whitespace-nowrap ml-4 text-xs">{menuFiintown[3]}</span>
                     </Link>
                  ) : (
                     <Link href="/forecast">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pyramid"> 
                           <path d="M2 18h20l-10-16z" /> 
                           <path d="M10 16v4" /> 
                           <path d="M14 16v4" /> 
                        </svg>
                     </Link>
                  )}
               </div>
            </li>
         </ul>
      </div>
   );
}
