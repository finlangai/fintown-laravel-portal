import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head } from "@inertiajs/react";
import { spawn } from "child_process";
import { useState } from "react";
export default function Dashboard() {
  const activeNavLink = { 
      color : "#25B770",
  }
  const menuItem = [
      "Bảng điều khiển" ,"Người dùng", "Hóa đơn" , "Sản phẩm và dịch vụ" ,
  ]
  const menuFiintown = [
      "Hồ sơ công ty" , "Báo cáo tài chính" , "Chỉ số tài chính" , "Kết quả dự phóng"
  ]
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
      <AuthenticatedLayout
          header={(setIsExpanded , isExpanded) => ( 
          <div> 
              <ul className="flex flex-col space-y-4 mt-5">
                      <li className="p-2 ml-2 text-white cursor-pointer" onClick={() => setIsExpanded(true)} style={activeNavLink}>
                          <div className="flex items-center">
                              {isExpanded ? ( 
                                  <a href="/">
                                      <p className="items-center font-semibold text-2xl">FiinTown</p>
                                  </a>
                              ):(
                                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-menu "> <rect width={18} height={18} x={3} y={3} rx={2} /> <path d="M7 8h10" /> <path d="M7 12h10" /> <path d="M7 16h10" /> </svg>
                              )}
                          </div>
                      </li>
                      <li className="p-2 ml-2 text-white cursor-pointer">
                          <div className="flex items-center">
                              {isExpanded ? (
                                  <span className="whitespace-nowrap ml-4 text-xs">{menuItem[0]}</span>
                              ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gauge" > <path d="m12 14 4-4" /> <path d="M3.34 19a10 10 0 1 1 17.32 0" /> </svg>
                              ) }
                          </div>
                      </li>
                      <li className="p-2 ml-2 text-white cursor-pointer">
                          <div className="flex items-center">
                              {isExpanded ? (
                                  <span className="whitespace-nowrap ml-4 text-xs">{menuItem[1]}</span>
                              ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user " > <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /> <circle cx={12} cy={7} r={4} />  </svg>
                              ) }
                          </div>
                      </li>
                      <li className="p-2 ml-2 text-white cursor-pointer">
                          <div className="flex items-center">
                              {isExpanded ? (
                                  <span className="whitespace-nowrap ml-4 text-xs">{menuItem[2]}</span>
                              ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-receipt" > <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /> <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /> <path d="M12 17.5v-11" /> </svg>
                              ) }
                          </div>
                      </li>
                      <li className="p-2 ml-2 text-white cursor-pointer">
                          <div className="flex items-center">
                              {isExpanded ? (
                                  <span className="whitespace-nowrap ml-4 text-xs">{menuItem[3]}</span>
                              ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-helping" > <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" /> <path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /> <path d="m2 13 6 6" /> </svg>
                              ) }
                          </div>
                      </li>
              </ul>
              {isExpanded && <div className="border-t border-transparent" style={{ borderColor: 'rgba(255, 255, 255, 0.3)', height: '1px' }} />}
              <ul className="flex flex-col space-y-4">
                      <li className="p-2 ml-2 text-white cursor-pointer" onClick={() => setIsExpanded(true)}>
                          <div className="flex items-center">
                              {isExpanded ? ( 
                                  <p className="items-center font-semibold text-2xl whitespace-nowrap text-text-Content">Công ty</p>
                              ):(
                                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building-2" > <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /> <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /> <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /> <path d="M10 6h4" /> <path d="M10 10h4" /> <path d="M10 14h4" /> <path d="M10 18h4" /> </svg>
                              )}
                          </div>
                      </li>
                      <li className="p-2 ml-2 text-white cursor-pointer">
                          <div className="flex items-center">
                              {isExpanded ? (
                                  <span className="whitespace-nowrap ml-4 text-xs">{menuFiintown[0]}</span>
                              ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-chart-column-increasing" > <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /> <path d="M14 2v4a2 2 0 0 0 2 2h4" /> <path d="M8 18v-2" /> <path d="M12 18v-4" /> <path d="M16 18v-6" /> </svg>
                              ) }
                          </div>
                      </li>
                      <li className="p-2 ml-2 text-white cursor-pointer">
                          <div className="flex items-center">
                              {isExpanded ? (
                                  <a href="/financial"><span className="whitespace-nowrap ml-4 text-xs">{menuFiintown[1]}</span></a>
                              ) : (
                                  <a href="/financial">
                                      <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-swiss-franc" > <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /> <path d="M11 17V8h4" /> <path d="M11 12h3" /> <path d="M9 16h4" /> </svg>
                                  </a>
                              ) }
                          </div>
                      </li>
                      <li className="p-2 ml-2 text-white cursor-pointer">
                          <div className="flex items-center">
                              {isExpanded ? (
                                  <span className="whitespace-nowrap ml-4 text-xs">{menuFiintown[2]}</span>
                              ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up-down" > <path d="M14.828 14.828 21 21" /> <path d="M21 16v5h-5" /> <path d="m21 3-9 9-4-4-6 6" /> <path d="M21 8V3h-5" /> </svg>

                              ) }
                          </div>
                      </li>
                      <li className="p-2 ml-2 text-white cursor-pointer">
                          <div className="flex items-center">
                              {isExpanded ? (
                                  <span className="whitespace-nowrap ml-4 text-xs">{menuFiintown[3]}</span>
                              ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain" > <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /> <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /> <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /> <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" /> <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" /> <path d="M3.477 10.896a4 4 0 0 1 .585-.396" /> <path d="M19.938 10.5a4 4 0 0 1 .585.396" /> <path d="M6 18a4 4 0 0 1-1.967-.516" /> <path d="M19.967 17.484A4 4 0 0 1 18 18" /> </svg>
                              ) }
                          </div>
                      </li>
              </ul>
          </div>
          )}
          >
          <Head title="Dashboard" />
          <div className="py-12">
              <div className="mx-auto sm:px-6 lg:px-8 max-w-7xl">
                  <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                      <div className="p-6 text-gray-900">
                          <p>nội dung trang Financial</p>
                      </div>
                  </div>
              </div>
          </div>
      </AuthenticatedLayout>
  );
}