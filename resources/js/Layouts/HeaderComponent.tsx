import { Link, usePage } from "@inertiajs/react";

interface HeaderComponentProps {
   isExpanded: boolean;
   handleSetIsExpanded: (value: boolean) => void;
}

export default function HeaderComponent({ isExpanded, handleSetIsExpanded }: HeaderComponentProps) {
   const activeNavLink = { 
      color: "#25B770",
   };
   const { userPermissionsAndRoles } : any= usePage().props;
   const permissions = userPermissionsAndRoles.permissions || [];
   const superAdmin = userPermissionsAndRoles.isSuperAdmin || false;
   const admin = userPermissionsAndRoles.isAdmin || false;
   const hasPermission = (permission: string) => {
      return superAdmin || permissions.includes(permission);
   };
   return (
      <div> 
         <ul className="flex flex-col space-y-4 mt-5">
            {/* cả admin và supper ADMIN đều sử dụng được  */}
            <li className="p-2 ml-2 text-text-head cursor-pointer" onClick={() => handleSetIsExpanded(true)} style={activeNavLink}>
               <div className="flex items-center">
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
            <li className="p-2 ml-2 text-text-head cursor-pointer">
               <div className="flex items-center">
                  {isExpanded ? (
                     <Link href="/dashboard">
                        <span className="whitespace-nowrap ml-4 text-xs">Bảng điều khiển</span>
                     </Link>
                  ) : (
                     <Link href="dashboard">
                         <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gauge">  <path d="m12 14 4-4" />  <path d="M3.34 19a10 10 0 1 1 17.32 0" />  </svg>
                     </Link>
                  )}
               </div>
            </li>
            {/* Mọi quyền cho super admin */}
            {superAdmin && (
               <>
                  <li className="p-2 ml-2 text-text-head cursor-pointer">
                     <div className="flex items-center">
                        {isExpanded ? (
                           <Link href="/staff">
                              <span className="whitespace-nowrap ml-4 text-xs">Quản lí nhân viên</span>
                           </Link>
                        ) : (
                           <Link href="staff">
                              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"> <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /> <circle cx={12} cy={7} r={4} /> </svg>
                           </Link>
                        )}
                     </div>
                  </li>
                  <li className="p-2 ml-2 text-text-head cursor-pointer">
                     <div className="flex items-center">
                        {isExpanded ? (
                           <Link href="/bill">
                              <span className="whitespace-nowrap ml-4 text-xs">Hóa đơn</span>
                           </Link>
                        ) : (
                           <Link href="/bill">
                              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-receipt">  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />  <path d="M12 17.5v-11" />  </svg>
                           </Link>
                        )}
                     </div>
                  </li>
                  <li className="p-2 ml-2 text-text-head cursor-pointer">
                     <div className="flex items-center">
                        {isExpanded ? (
                           <span className="whitespace-nowrap ml-4 text-xs">Sản phẩm và dịch vụ</span>
                        ) : (
                           <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-helping"> 
                              <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" /> 
                              <path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /> 
                              <path d="m2 13 6 6" /> 
                           </svg>
                        )}
                     </div>
                  </li>  
               </>
            )}
            {/* Quyền dành cho admin Nhưng phải được phân */}
            {
               admin && hasPermission('view_bill') && (
                   <li className="p-2 ml-2 text-text-head cursor-pointer">
                     <div className="flex items-center">
                        {isExpanded ? (
                           <Link href="/bill">
                           <span className="whitespace-nowrap ml-4 text-xs">Hóa đơn</span>
                           </Link>
                        ) : (
                           <Link href="/bill">
                              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-receipt">  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />  <path d="M12 17.5v-11" />  </svg>
                           </Link>
                        )}
                     </div>
                  </li>
               )
            }
            {
               admin && hasPermission('view_products_services') && (
                  <li className="p-2 ml-2 text-text-head cursor-pointer">
                  <div className="flex items-center">
                     {isExpanded ? (
                        <Link href="/service">
                           <span className="whitespace-nowrap ml-4 text-xs">Sản phẩm và dịch vụ</span>
                        </Link>
                     ) : (
                        <Link href="/service">
                           <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-helping"> <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" /> <path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /> <path d="m2 13 6 6" /> </svg>
                        </Link>
                     )}
                  </div>
               </li>
               )
            }
         </ul>
         {isExpanded && <div className="border-t border-transparent" style={{ borderColor: 'rgba(255, 255, 255, 0.3)', height: '1px' }} />}
         <ul className="flex flex-col space-y-4 mt-5">
         {superAdmin && (
            <>
               <li className="p-2 ml-2 text-text-head cursor-pointer" onClick={() => handleSetIsExpanded(true)}>
                  <div className="flex items-center">
                     {isExpanded ? ( 
                        <p className="items-center font-semibold text-2xl whitespace-nowrap text-text-head">Công ty</p>
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
               <li className="p-2 ml-2 text-text-head cursor-pointer">
                  <div className="flex items-center">
                     {isExpanded ? (
                        <Link href="/company">
                           <span className="whitespace-nowrap ml-4 text-xs">Hồ sơ công ty</span>
                        </Link>
                     ) : (
                        <Link href="/company">
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-column-stacked" > <path d="M11 13H7" /> <path d="M19 9h-4" /> <path d="M3 3v16a2 2 0 0 0 2 2h16" /> <rect x={15} y={5} width={4} height={12} rx={1} /> <rect x={7} y={8} width={4} height={9} rx={1} /> </svg>
                        </Link>
                     )}
                  </div>
               </li>
               <li className="p-2 ml-2 text-text-head cursor-pointer">
                  <div className="flex items-center">
                     {isExpanded ? (
                        <Link href="/financial">
                           <span className="whitespace-nowrap ml-4 text-xs">Báo cáo tài chính</span>
                        </Link>
                     ) : (
                        <Link href="/financial">
                           <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-japanese-yen" > <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /> <path d="m9 8 3 3v7" /> <path d="m12 11 3-3" /> <path d="M9 12h6" /> <path d="M9 16h6" /> </svg>
                        </Link>
                     )}
                  </div>
               </li>
               <li className="p-2 ml-2 text-text-head cursor-pointer">
                  <div className="flex items-center">
                     {isExpanded ? (
                        <Link href="/financial-indices">
                           <span className="whitespace-nowrap ml-4 text-xs">Chỉ số tài chính</span>
                        </Link>
                     ) : (
                        <Link href="/financial-indices">
                           <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up-down" > <path d="M14.828 14.828 21 21" /> <path d="M21 16v5h-5" /> <path d="m21 3-9 9-4-4-6 6" /> <path d="M21 8V3h-5" /> </svg>
                        </Link>
                     )}
                  </div>
               </li>
               <li className="p-2 ml-2 text-text-head cursor-pointer">
                  <div className="flex items-center">
                     {isExpanded ? (
                        <Link href="/forecast">
                           <span className="whitespace-nowrap ml-4 text-xs">Kết quả dự phóng</span>
                        </Link>
                     ) : (
                        <Link href="/forecast">
                          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-check" > <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" /> <path d="m9 9.5 2 2 4-4" /> </svg>
                        </Link>
                     )}
                  </div>
               </li>
            </>
         )}

         {
            admin && hasPermission('view_company') && (
               <li className="p-2 ml-2 text-text-head cursor-pointer">
                  <div className="flex items-center">
                     {isExpanded ? (
                        <Link href="/company">
                           <span className="whitespace-nowrap ml-4 text-xs">Hồ sơ công ty</span>
                        </Link>
                     ) : (
                        <Link href="/company">
                           <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-column-stacked" > <path d="M11 13H7" /> <path d="M19 9h-4" /> <path d="M3 3v16a2 2 0 0 0 2 2h16" /> <rect x={15} y={5} width={4} height={12} rx={1} /> <rect x={7} y={8} width={4} height={9} rx={1} /> </svg>
                        </Link>
                     )}
                  </div>
            </li>
            )
         }
         {
            admin && hasPermission('view_financial') &&(
               <li className="p-2 ml-2 text-text-head cursor-pointer">
               <div className="flex items-center">
                  {isExpanded ? (
                     <Link href="/financial">
                        <span className="whitespace-nowrap ml-4 text-xs">Báo cáo tài chính</span>
                     </Link>
                  ) : (
                     <Link href="/financial">
                         <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-japanese-yen" > <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /> <path d="m9 8 3 3v7" /> <path d="m12 11 3-3" /> <path d="M9 12h6" /> <path d="M9 16h6" /> </svg>
                     </Link>
                  )}
               </div>
            </li>
            )
         }
         {
            admin && hasPermission('view_financial_index') && (
               <li className="p-2 ml-2 text-text-head cursor-pointer">
               <div className="flex items-center">
                  {isExpanded ? (
                     <Link href="/financial-indices">
                        <span className="whitespace-nowrap ml-4 text-xs">Chỉ số tài chính</span>
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
            )
         }
         {
            admin && hasPermission('view_Projected_results') && (
               <li className="p-2 ml-2 text-text-head cursor-pointer">
                  <div className="flex items-center">
                     {isExpanded ? (
                        <Link href="/forecast">
                           <span className="whitespace-nowrap ml-4 text-xs">Kết quả dự phóng</span>
                        </Link>
                     ) : (
                        <Link href="/forecast">
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-check" > <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" /> <path d="m9 9.5 2 2 4-4" /> </svg>
                        </Link>
                     )}
                  </div>
               </li>
            )
         }
         </ul>

      </div>
   );
}
