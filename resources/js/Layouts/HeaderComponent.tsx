import { Link, usePage } from "@inertiajs/react";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
 } from "@/Components/UI/accordion"
 import {
   HoverCard,
   HoverCardContent,
   HoverCardTrigger,
 } from "@/Components/UI/hover-card"
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
      <div className="h-full"> 
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
            {/* Mọi quyền cho super admin */}
            {superAdmin && (
               <>
                  <li className="p-2 ml-2 text-text-head cursor-pointer rounded-xl  transition duration-300 hover:bg-accent-color ">
                     <div className="flex items-center">
                        {isExpanded ? (
                           <Accordion type="single" collapsible>
                           <AccordionItem value="item-2" className="border-none transition-none hover:text-white">
                             <AccordionTrigger>
                                 <div className="flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-cog" > <path d="M2 21a8 8 0 0 1 10.434-7.62" /> <circle cx={10} cy={8} r={5} /> <circle cx={18} cy={18} r={3} /> <path d="m19.5 14.3-.4.9" /> <path d="m16.9 20.8-.4.9" /> <path d="m21.7 19.5-.9-.4" /> <path d="m15.2 16.9-.9-.4" /> <path d="m21.7 16.5-.9.4" /> <path d="m15.2 19.1-.9.4" /> <path d="m19.5 21.7-.4-.9" /> <path d="m16.9 15.2-.4-.9" /> </svg>
                                    <span className="whitespace-nowrap ml-4 text-xs">Quản lí nhân viên</span>
                                 </div>
                             </AccordionTrigger>
                                 <AccordionContent className="ml-2">
                                    <ul>
                                       <li className="mt-5 hover:underline">
                                          <Link href="/staff-list">
                                             <div className="flex justify-start items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-check" > <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /> <circle cx={9} cy={7} r={4} /> <polyline points="16 11 18 13 22 9" /> </svg>
                                                <span className="whitespace-nowrap ml-2 text-xs">Danh sách nhân viên</span>
                                             </div>
                                          </Link>
                                       </li>
                                       <li className="mt-5 hover:underline">
                                          <Link href="/add-staff">
                                             <div className="flex justify-start items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-plus" > <path d="M2 21a8 8 0 0 1 13.292-6" /> <circle cx={10} cy={8} r={5} /> <path d="M19 16v6" /> <path d="M22 19h-6" /> </svg>
                                                <span className="whitespace-nowrap ml-2 text-xs">Thêm nhân viên</span>
                                             </div>
                                          </Link>
                                       </li>
                                       <li className="mt-5 hover:underline">
                                          <Link href="/staff">
                                             <div className="flex justify-start items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-plus" > <path d="M2 21a8 8 0 0 1 13.292-6" /> <circle cx={10} cy={8} r={5} /> <path d="M19 16v6" /> <path d="M22 19h-6" /> </svg>
                                                <span className="whitespace-nowrap ml-2 text-xs">Phân quyền</span>
                                             </div>
                                          </Link>
                                       </li>
                                    </ul>
                                 </AccordionContent>
                           </AccordionItem>
                         </Accordion>
                        ) : (
                           <Accordion type="single" collapsible>
                              <AccordionItem value="item-2"  className="border-none  transition-none hover:text-white">
                                 <AccordionTrigger>
                                    <div className="relative inline-block">                              
                                       <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-cog" > <path d="M2 21a8 8 0 0 1 10.434-7.62" /> <circle cx={10} cy={8} r={5} /> <circle cx={18} cy={18} r={3} /> <path d="m19.5 14.3-.4.9" /> <path d="m16.9 20.8-.4.9" /> <path d="m21.7 19.5-.9-.4" /> <path d="m15.2 16.9-.9-.4" /> <path d="m21.7 16.5-.9.4" /> <path d="m15.2 19.1-.9.4" /> <path d="m19.5 21.7-.4-.9" /> <path d="m16.9 15.2-.4-.9" /> </svg>
                                    </div>
                                 </AccordionTrigger>
                                 <AccordionContent className="ml-2">
                                       <ul>
                                          <li className="mt-5">
                                             <HoverCard>
                                                <HoverCardTrigger className="hover:bg-accent-color-sub">
                                                   <Link href="/staff-list">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-check" > <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /> <circle cx={9} cy={7} r={4} /> <polyline points="16 11 18 13 22 9" /> </svg>
                                                   </Link>
                                                </HoverCardTrigger>
                                                <HoverCardContent side="right"  align="start" >
                                                    Danh sách nhân viên
                                                </HoverCardContent>
                                             </HoverCard>
                                          </li>
                                          <li className="mt-5">
                                             <HoverCard>
                                                <HoverCardTrigger>
                                                   <Link href="/add-staff">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-plus" > <path d="M2 21a8 8 0 0 1 13.292-6" /> <circle cx={10} cy={8} r={5} /> <path d="M19 16v6" /> <path d="M22 19h-6" /> </svg>
                                                   </Link>
                                                </HoverCardTrigger>
                                                <HoverCardContent  side="right"  align="start">
                                                   Thêm nhân viên
                                                </HoverCardContent>
                                             </HoverCard>
                                          </li>
                                          <li className="mt-5">
                                             <HoverCard>
                                                <HoverCardTrigger>
                                                   <Link href="/add-staff">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-pen" > <path d="M11.5 15H7a4 4 0 0 0-4 4v2" /> <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /> <circle cx={10} cy={7} r={4} /> </svg>
                                                   </Link>
                                                </HoverCardTrigger>
                                                <HoverCardContent  side="right"  align="start">
                                                   Phân quyền
                                                </HoverCardContent>
                                             </HoverCard>
                                          </li>
                                          <li></li>
                                       </ul>
                                 </AccordionContent>
                              </AccordionItem>
                           </Accordion>
                        )}
                     </div>
                  </li>
                  <li className="p-2 ml-2 text-text-head cursor-pointer rounded-xl  transition duration-300 hover:bg-accent-color ">
                     <div className="flex items-center">
                        {isExpanded ? (
                           <Accordion type="single" collapsible>
                           <AccordionItem value="item-2" className="border-none transition-none hover:text-white">
                             <AccordionTrigger>
                                 <div className="flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag" > <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /> <path d="M3 6h18" /> <path d="M16 10a4 4 0 0 1-8 0" /> </svg>

                                    <span className="whitespace-nowrap ml-4 text-xs">Hóa đơn khách hàng</span>
                                 </div>
                             </AccordionTrigger>
                                 <AccordionContent className="ml-2">
                                    <ul>
                                       <li className="mt-5 hover:underline">
                                          <Link href="/bill-list">
                                             <div className="flex justify-start items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-start" > <path d="M16 12H3" /> <path d="M16 18H3" /> <path d="M10 6H3" /> <path d="M21 18V8a2 2 0 0 0-2-2h-5" /> <path d="m16 8-2-2 2-2" /> </svg>
                                                <span className="whitespace-nowrap ml-2 text-xs">Danh sách hóa đơn</span>
                                             </div>
                                          </Link>
                                       </li>
                                       <li className="mt-5 hover:underline">
                                          <Link href="/check-bill">
                                             <div className="flex justify-start items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-check" > <path d="M11 18H3" /> <path d="m15 18 2 2 4-4" /> <path d="M16 12H3" /> <path d="M16 6H3" /> </svg>
                                                <span className="whitespace-nowrap ml-2 text-xs">Xác nhân hóa đơn</span>
                                             </div>
                                          </Link>
                                       </li>
                                       <li className="mt-5 hover:underline">
                                          <Link href="/bill-cancel">
                                             <div className="flex justify-start items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-x" > <path d="M11 12H3" /> <path d="M16 6H3" /> <path d="M16 18H3" /> <path d="m19 10-4 4" /> <path d="m15 10 4 4" /> </svg>
                                                <span className="whitespace-nowrap ml-2 text-xs">Hóa đơn bị từ chối</span>
                                             </div>
                                          </Link>
                                       </li>
                                    </ul>
                                 </AccordionContent>
                           </AccordionItem>
                         </Accordion>
                        ) : (
                           <Accordion type="single" collapsible>
                              <AccordionItem value="item-2"  className="border-none  transition-none hover:text-white">
                                 <AccordionTrigger>
                                    <div className="relative inline-block">                              
                                       <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag" > <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /> <path d="M3 6h18" /> <path d="M16 10a4 4 0 0 1-8 0" /> </svg>
                                    </div>
                                 </AccordionTrigger>
                                 <AccordionContent className="ml-2">
                                       <ul>
                                          <li className="mt-5">
                                             <HoverCard>
                                                <HoverCardTrigger className="hover:bg-accent-color-sub">
                                                   <Link href="/staff-list">
                                                   <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-start" > <path d="M16 12H3" /> <path d="M16 18H3" /> <path d="M10 6H3" /> <path d="M21 18V8a2 2 0 0 0-2-2h-5" /> <path d="m16 8-2-2 2-2" /> </svg>
                                                   </Link>
                                                </HoverCardTrigger>
                                                <HoverCardContent side="right"  align="start" >
                                                    Danh sách Hóa đơn
                                                </HoverCardContent>
                                             </HoverCard>
                                          </li>
                                          <li className="mt-5">
                                             <HoverCard>
                                                <HoverCardTrigger>
                                                   <Link href="/add-staff">
                                                   <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-check" > <path d="M11 18H3" /> <path d="m15 18 2 2 4-4" /> <path d="M16 12H3" /> <path d="M16 6H3" /> </svg>
                                                   </Link>
                                                </HoverCardTrigger>
                                                <HoverCardContent  side="right"  align="start">
                                                   Xác nhận hóa đơn
                                                </HoverCardContent>
                                             </HoverCard>
                                          </li>
                                          <li className="mt-5">
                                             <HoverCard>
                                                <HoverCardTrigger>
                                                   <Link href="/add-staff">
                                                   <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-x" > <path d="M11 12H3" /> <path d="M16 6H3" /> <path d="M16 18H3" /> <path d="m19 10-4 4" /> <path d="m15 10 4 4" /> </svg>
                                                   </Link>
                                                </HoverCardTrigger>
                                                <HoverCardContent  side="right"  align="start">
                                                   Hóa đơn bị từ chối
                                                </HoverCardContent>
                                             </HoverCard>
                                          </li>
                                          <li></li>
                                       </ul>
                                 </AccordionContent>
                              </AccordionItem>
                           </Accordion>
                        )}
                     </div>
                  </li>
                  <li className="p-2 ml-2 text-text-head cursor-pointer rounded-xl  transition duration-300 hover:bg-accent-color ">
                     <div className="flex items-center">
                        {isExpanded ? (
                           <Accordion type="single" collapsible>
                           <AccordionItem value="item-2" className="border-none transition-none hover:text-white">
                             <AccordionTrigger>
                                 <div className="flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-type" > <rect width={8} height={4} x={8} y={2} rx={1} ry={1} /> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /> <path d="M9 12v-1h6v1" /> <path d="M11 17h2" /> <path d="M12 11v6" /> </svg>
                                    <span className="whitespace-nowrap ml-4 text-xs">Bài viết dự đoán</span>
                                 </div>
                             </AccordionTrigger>
                                 <AccordionContent className="ml-2">
                                    <ul>
                                       <li className="mt-5 hover:underline">
                                          <Link href="/post-list">
                                             <div className="flex justify-start items-center">
                                                 <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard" > <rect width={8} height={4} x={8} y={2} rx={1} ry={1} /> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /> </svg>
                                                <span className="whitespace-nowrap ml-2 text-xs">Danh sách bài viết</span>
                                             </div>
                                          </Link>
                                       </li>
                                      
                                       <li className="mt-5 hover:underline">
                                          <Link href="/post-report">
                                             <div className="flex justify-start items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-notebook-pen" > <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" /> <path d="M2 6h4" /> <path d="M2 10h4" /> <path d="M2 14h4" /> <path d="M2 18h4" /> <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /> </svg>
                                                <span className="whitespace-nowrap ml-2 text-xs">Bài viết công bố</span>
                                             </div>
                                          </Link>
                                       </li>
                                       <li className="mt-5 hover:underline">
                                          <Link href="/post-article">
                                             <div className="flex justify-start items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line" > <path d="M12 20h9" /> <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" /> <path d="m15 5 3 3" /> </svg>
                                                <span className="whitespace-nowrap ml-2 text-xs">Chỉnh sửa bài viết</span>
                                             </div>
                                          </Link>
                                       </li>
                                    </ul>
                                 </AccordionContent>
                           </AccordionItem>
                         </Accordion>
                        ) : (
                           <Accordion type="single" collapsible>
                              <AccordionItem value="item-2"  className="border-none  transition-none hover:text-white">
                                 <AccordionTrigger>
                                    <div className="relative inline-block">                              
                                       <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-type" > <rect width={8} height={4} x={8} y={2} rx={1} ry={1} /> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /> <path d="M9 12v-1h6v1" /> <path d="M11 17h2" /> <path d="M12 11v6" /> </svg>
                                    </div>
                                 </AccordionTrigger>
                                 <AccordionContent className="ml-2">
                                       <ul>
                                          <li className="mt-5">
                                             <HoverCard>
                                                <HoverCardTrigger className="hover:bg-accent-color-sub">
                                                   <Link href="/post-list">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard" > <rect width={8} height={4} x={8} y={2} rx={1} ry={1} /> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /> </svg>
                                                   </Link>
                                                </HoverCardTrigger>
                                                <HoverCardContent side="right"  align="start" >
                                                    Danh sách Bài viết
                                                </HoverCardContent>
                                             </HoverCard>
                                          </li>
                                          <li className="mt-5">
                                             <HoverCard>
                                                <HoverCardTrigger>
                                                   <Link href="/post-report">
                                                   <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-notebook-pen" > <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" /> <path d="M2 6h4" /> <path d="M2 10h4" /> <path d="M2 14h4" /> <path d="M2 18h4" /> <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /> </svg>
                                                   </Link>
                                                </HoverCardTrigger>
                                                <HoverCardContent  side="right"  align="start">
                                                   Bài viết công bố
                                                </HoverCardContent>
                                             </HoverCard>
                                          </li>
                                          <li className="mt-5">
                                             <HoverCard>
                                                <HoverCardTrigger>
                                                   <Link href="/post-article">
                                                   <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line" > <path d="M12 20h9" /> <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" /> <path d="m15 5 3 3" /> </svg>
                                                   </Link>
                                                </HoverCardTrigger>
                                                <HoverCardContent  side="right"  align="start">
                                                   Chỉnh sửa bài viết
                                                </HoverCardContent>
                                             </HoverCard>
                                          </li>
                                          <li></li>
                                       </ul>
                                 </AccordionContent>
                              </AccordionItem>
                           </Accordion>
                        )}
                     </div>
                  </li>
               </>
            )}
         </ul>
         <ul className="flex flex-col space-y-4 mt-5">            
         {superAdmin && (
            <>
                <li className="p-2 ml-2 text-text-head cursor-pointer rounded-xl  transition duration-300 hover:bg-accent-color ">
                     <div className="flex items-center">
                        {isExpanded ? (
                           <Accordion type="single" collapsible>
                           <AccordionItem value="item-2" className="border-none transition-none hover:text-white">
                             <AccordionTrigger>
                                 <div className="flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-factory" > <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /> <path d="M17 18h1" /> <path d="M12 18h1" /> <path d="M7 18h1" /> </svg>
                                    <span className="whitespace-nowrap ml-4 text-xs">Hồ sơ công ty</span>
                                 </div>
                             </AccordionTrigger>
                                 <AccordionContent className="ml-2">
                                    <ul>
                                       <li className="mt-5 hover:underline">
                                          <Link href="/company">
                                             <div className="flex justify-start items-center">
                                                 <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard" > <rect width={8} height={4} x={8} y={2} rx={1} ry={1} /> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /> </svg>
                                                <span className="whitespace-nowrap ml-2 text-xs">Danh sách công ty</span>
                                             </div>
                                          </Link>
                                       </li>
                                      
                                       <li className="mt-5 hover:underline">
                                          <Link href="/edit-company">
                                             <div className="flex justify-start items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-highlighter" > <path d="m9 11-6 6v3h9l3-3" /> <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" /> </svg>

                                                <span className="whitespace-nowrap ml-2 text-xs">Chỉnh sửa hồ sơ</span>
                                             </div>
                                          </Link>
                                       </li>
                                       <li className="mt-5 hover:underline">
                                          <Link href="/holder-list">
                                             <div className="flex justify-start items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building" > <rect width={16} height={20} x={4} y={2} rx={2} ry={2} /> <path d="M9 22v-4h6v4" /> <path d="M8 6h.01" /> <path d="M16 6h.01" /> <path d="M12 6h.01" /> <path d="M12 10h.01" /> <path d="M12 14h.01" /> <path d="M16 10h.01" /> <path d="M16 14h.01" /> <path d="M8 10h.01" /> <path d="M8 14h.01" /> </svg>
                                                <span className="whitespace-nowrap ml-2 text-xs">Danh sách cổ đông</span>
                                             </div>
                                          </Link>
                                       </li>
                                    </ul>
                                 </AccordionContent>
                           </AccordionItem>
                         </Accordion>
                        ) : (
                           <Accordion type="single" collapsible>
                              <AccordionItem value="item-2"  className="border-none  transition-none hover:text-white">
                                 <AccordionTrigger>
                                    <div className="relative inline-block">                              
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-factory" > <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /> <path d="M17 18h1" /> <path d="M12 18h1" /> <path d="M7 18h1" /> </svg>
                                    </div>
                                 </AccordionTrigger>
                                 <AccordionContent className="ml-2">
                                       <ul>
                                          <li className="mt-5">
                                             <HoverCard>
                                                <HoverCardTrigger className="hover:bg-accent-color-sub">
                                                   <Link href="/staff-list">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard" > <rect width={8} height={4} x={8} y={2} rx={1} ry={1} /> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /> </svg>
                                                   </Link>
                                                </HoverCardTrigger>
                                                <HoverCardContent side="right"  align="start" >
                                                    Danh sách công ty
                                                </HoverCardContent>
                                             </HoverCard>
                                          </li>
                                          <li className="mt-5">
                                             <HoverCard>
                                                <HoverCardTrigger>
                                                   <Link href="/add-staff">
                                                   <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-highlighter" > <path d="m9 11-6 6v3h9l3-3" /> <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" /> </svg>
                                                   </Link>
                                                </HoverCardTrigger>
                                                <HoverCardContent  side="right"  align="start">
                                                   Chỉnh sửa hồ sơ
                                                </HoverCardContent>
                                             </HoverCard>
                                          </li>
                                          <li className="mt-5">
                                             <HoverCard>
                                                <HoverCardTrigger>
                                                   <Link href="/add-staff">
                                                   <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building" > <rect width={16} height={20} x={4} y={2} rx={2} ry={2} /> <path d="M9 22v-4h6v4" /> <path d="M8 6h.01" /> <path d="M16 6h.01" /> <path d="M12 6h.01" /> <path d="M12 10h.01" /> <path d="M12 14h.01" /> <path d="M16 10h.01" /> <path d="M16 14h.01" /> <path d="M8 10h.01" /> <path d="M8 14h.01" /> </svg>
                                                   </Link>
                                                </HoverCardTrigger>
                                                <HoverCardContent  side="right"  align="start">
                                                   Chỉnh sửa bài viết
                                                </HoverCardContent>
                                             </HoverCard>
                                          </li>
                                          <li></li>
                                       </ul>
                                 </AccordionContent>
                              </AccordionItem>
                           </Accordion>
                        )}
                     </div>
                </li>
                <li className="p-2 ml-2 text-text-head cursor-pointer rounded-xl  transition duration-300 hover:bg-accent-color ">
                     <div className="flex items-center">
                        {isExpanded ? (
                           <Accordion type="single" collapsible>
                           <AccordionItem value="item-2" className="border-none transition-none hover:text-white">
                             <AccordionTrigger>
                                 <div className="flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-spline" > <path d="M3 3v16a2 2 0 0 0 2 2h16" /> <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" /> </svg>
                                    <span className="whitespace-nowrap ml-4 text-xs">Báo cáo tài chính</span>
                                 </div>
                             </AccordionTrigger>
                                 <AccordionContent className="ml-2">
                                    <ul>
                                       <li className="mt-5 hover:underline">
                                          <Link href="/financial">
                                             <div className="flex justify-start items-center">
                                                 <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard" > <rect width={8} height={4} x={8} y={2} rx={1} ry={1} /> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /> </svg>
                                                <span className="whitespace-nowrap ml-2 text-xs">Hồ sơ báo cáo</span>
                                             </div>
                                          </Link>
                                       </li>
                                      
                                       <li className="mt-5 hover:underline">
                                          <Link href="/edit-financial">
                                             <div className="flex justify-start items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-pen" > <path d="M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5" /> <path d="M14 2v4a2 2 0 0 0 2 2h4" /> <path d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /> </svg>
                                                <span className="whitespace-nowrap ml-2 text-xs">Chỉnh sửa hồ sơ</span>
                                             </div>
                                          </Link>
                                       </li>
                                       <li className="mt-5 hover:underline">
                                          <Link href="/financial-year">
                                             <div className="flex justify-start items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open-text" > <path d="M12 7v14" /> <path d="M16 12h2" /> <path d="M16 8h2" /> <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" /> <path d="M6 12h2" /> <path d="M6 8h2" /> </svg>
                                                <span className="whitespace-nowrap ml-2 text-xs">Báo cáo tài chính theo năm</span>
                                             </div>
                                          </Link>
                                       </li>
                                    </ul>
                                 </AccordionContent>
                           </AccordionItem>
                         </Accordion>
                        ) : (
                           <Accordion type="single" collapsible>
                              <AccordionItem value="item-2"  className="border-none  transition-none hover:text-white">
                                 <AccordionTrigger>
                                    <div className="relative inline-block">                              
                                       <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-spline" > <path d="M3 3v16a2 2 0 0 0 2 2h16" /> <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" /> </svg>
                                    </div>
                                 </AccordionTrigger>
                                 <AccordionContent className="ml-2">
                                       <ul>
                                          <li className="mt-5">
                                             <HoverCard>
                                                <HoverCardTrigger className="hover:bg-accent-color-sub">
                                                   <Link href="/staff-list">
                                                   <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard" > <rect width={8} height={4} x={8} y={2} rx={1} ry={1} /> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /> </svg>
                                                   </Link>
                                                </HoverCardTrigger>
                                                <HoverCardContent side="right"  align="start" >
                                                    Hồ sơ báo cáo
                                                </HoverCardContent>
                                             </HoverCard>
                                          </li>
                                          <li className="mt-5">
                                             <HoverCard>
                                                <HoverCardTrigger>
                                                   <Link href="/add-staff">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-pen" > <path d="M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5" /> <path d="M14 2v4a2 2 0 0 0 2 2h4" /> <path d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /> </svg>
                                                   </Link>
                                                </HoverCardTrigger>
                                                <HoverCardContent  side="right"  align="start">
                                                   Chỉnh sửa hồ sơ
                                                </HoverCardContent>
                                             </HoverCard>
                                          </li>
                                          <li className="mt-5">
                                             <HoverCard>
                                                <HoverCardTrigger>
                                                   <Link href="/add-staff">
                                                   <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open-text" > <path d="M12 7v14" /> <path d="M16 12h2" /> <path d="M16 8h2" /> <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" /> <path d="M6 12h2" /> <path d="M6 8h2" /> </svg>
                                                   </Link>
                                                </HoverCardTrigger>
                                                <HoverCardContent  side="right"  align="start">
                                                   Báo cáo tài chính theo năm
                                                </HoverCardContent>
                                             </HoverCard>
                                          </li>
                                          <li></li>
                                       </ul>
                                 </AccordionContent>
                              </AccordionItem>
                           </Accordion>
                        )}
                     </div>
                </li>
                <li className="p-2 ml-2 text-text-head cursor-pointer rounded-xl  transition duration-300 hover:bg-accent-color ">
                     <div className="flex items-center">
                        {isExpanded ? (
                           <Accordion type="single" collapsible>
                           <AccordionItem value="item-2" className="border-none transition-none hover:text-white">
                             <AccordionTrigger>
                                 <div className="flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-column" > <path d="M3 3v16a2 2 0 0 0 2 2h16" /> <path d="M18 17V9" /> <path d="M13 17V5" /> <path d="M8 17v-3" /> </svg>
                                    <span className="whitespace-nowrap ml-4 text-xs">Chỉ số tài chính</span>
                                 </div>
                             </AccordionTrigger>
                                 <AccordionContent className="ml-2">
                                    <ul>
                                       <li className="mt-5 hover:underline">
                                          <Link href="/growth">
                                             <div className="flex justify-start items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-no-axes-combined" > <path d="M12 16v5" /> <path d="M16 14v7" /> <path d="M20 10v11" /> <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" /> <path d="M4 18v3" /> <path d="M8 14v7" /> </svg>
                                                <span className="whitespace-nowrap ml-2 text-xs">Chỉ số tăng trưởng</span>
                                             </div>
                                          </Link>
                                       </li>
                                       <li className="mt-5 hover:underline">
                                          <Link href="/information-index">
                                             <div className="flex justify-start items-center">
                                             <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-column-stacked" > <path d="M11 13H7" /> <path d="M19 9h-4" /> <path d="M3 3v16a2 2 0 0 0 2 2h16" /> <rect x={15} y={5} width={4} height={12} rx={1} /> <rect x={7} y={8} width={4} height={9} rx={1} /> </svg>
                                                <span className="whitespace-nowrap ml-2 text-xs">Thông tin chỉ số tài chính</span>
                                             </div>
                                          </Link>
                                       </li>
                                    </ul>
                                 </AccordionContent>
                           </AccordionItem>
                         </Accordion>
                        ) : (
                           <Accordion type="single" collapsible>
                              <AccordionItem value="item-2"  className="border-none  transition-none hover:text-white">
                                 <AccordionTrigger>
                                    <div className="relative inline-block">                              
                                       <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-column" > <path d="M3 3v16a2 2 0 0 0 2 2h16" /> <path d="M18 17V9" /> <path d="M13 17V5" /> <path d="M8 17v-3" /> </svg>
                                    </div>
                                 </AccordionTrigger>
                                 <AccordionContent className="ml-2">
                                       <ul>
                                          <li className="mt-5">
                                             <HoverCard>
                                                <HoverCardTrigger className="hover:bg-accent-color-sub">
                                                   <Link href="/growth">
                                                   <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-no-axes-combined" > <path d="M12 16v5" /> <path d="M16 14v7" /> <path d="M20 10v11" /> <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" /> <path d="M4 18v3" /> <path d="M8 14v7" /> </svg>
                                                   </Link>
                                                </HoverCardTrigger>
                                                <HoverCardContent side="right"  align="start" >
                                                   chỉ số tăng trưởng
                                                </HoverCardContent>
                                             </HoverCard>
                                          </li>
                                          <li className="mt-5">
                                             <HoverCard>
                                                <HoverCardTrigger>
                                                   <Link href="/information-index">
                                                   <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-column-stacked" > <path d="M11 13H7" /> <path d="M19 9h-4" /> <path d="M3 3v16a2 2 0 0 0 2 2h16" /> <rect x={15} y={5} width={4} height={12} rx={1} /> <rect x={7} y={8} width={4} height={9} rx={1} /> </svg>
                                                   </Link>
                                                </HoverCardTrigger>
                                                <HoverCardContent  side="right"  align="start">
                                                   Thông tin chỉ số tài chính
                                                </HoverCardContent>
                                             </HoverCard>
                                          </li>
                                       </ul>
                                 </AccordionContent>
                              </AccordionItem>
                           </Accordion>
                        )}
                     </div>
                </li>
               <li className="p-2 ml-2 text-text-head cursor-pointer rounded-xl  hover:text-white transition duration-300 hover:bg-accent-color ">
                  <div className="flex items-center">
                     {isExpanded ? (
                        <Link href="/projected-results" className="flex justify-center items-center">
                           <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-check" > <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" /> <path d="m9 9.5 2 2 4-4" /> </svg>
                           <span className="whitespace-nowrap ml-4 text-xs">Kết quả dự phóng</span>
                        </Link>
                     ) : (
                        <Link href="/projected-results">
                          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-check" > <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" /> <path d="m9 9.5 2 2 4-4" /> </svg>
                        </Link>
                     )}
                  </div>
               </li>
              
            </>
         )}
         </ul>
         <ul className="mt-28"> 
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
