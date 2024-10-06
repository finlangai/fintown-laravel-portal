import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import * as React from "react";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react" 
import { cn } from "@/Lib/utils"
import { Button } from "@/Components/UI/Button"
import { Calendar } from "@/Components/UI/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/UI/popover"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/Components/UI/select"

export default function Financial () {
    const activeNavLink = { 
        color : "#25B770",
    } 
    const menuItem = [
        "Bảng điều khiển" ,"Người dùng", "Hóa đơn" , "Sản phẩm và dịch vụ" ,
    ]
    const menuFiintown = [
        "Hồ sơ công ty" , "Báo cáo tài chính" , "Chỉ số tài chính" , "Kết quả dự phóng"
    ]
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const { statements, currentPage, totalPages} = usePage().props;
    const dataStatements: any  = statements;





    return(
      <>
          <AuthenticatedLayout
            header={(setIsExpanded , isExpanded) => ( 
            <div> 
                <ul className="flex flex-col space-y-4 mt-5">
                        <li className="p-2 ml-2 text-white cursor-pointer" onClick={() => setIsExpanded(true)} >
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
                                    <a href="/company"><span className="whitespace-nowrap ml-4 text-xs">{menuFiintown[0]}</span></a>
                                ) : (
                                    <a href="/company">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-chart-column-increasing" > <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /> <path d="M14 2v4a2 2 0 0 0 2 2h4" /> <path d="M8 18v-2" /> <path d="M12 18v-4" /> <path d="M16 18v-6" /> </svg>
                                    </a>
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
            <Head title="Financial"/>
            <div className="py-5">
               <div className="mx-auto sm:px-6 lg:px-8 max-w-7xl">
                  <div className="flex flex-col min-h-[86vh]">
                     <div className="py-3">
                            <h2 className="text-text-Content text-2xl font-bold">Danh sách báo cáo tài chính </h2>
                     </div>
                     <div className="flex justify-between items-center">
                        <div id="tool" className="flex bg-background-active border-0 rounded-[8px] w-[1000px] p-4">
                                 <div className="flex-1 relative flex items-center mx-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 text-white"> 
                                        <circle cx="11" cy="11" r="8" /> 
                                        <path d="m21 21-4.3-4.3" /> 
                                    </svg>
                                    <input type="text" placeholder="Mã cổ phiếu..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-3xl bg-transparent placeholder-gray-500 w-full text-sm text-white" />
                                </div>
                                <div id="date" className="flex-1 flex items-center justify-center mx-2 rounded">
                                 <Popover>
                                       <PopoverTrigger asChild>
                                          <Button variant={"outline"} className="bg-transparent text-text-Content rounded-2xl">
                                             <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                                                   <span>Chọn ngày cập nhập</span>
                                          </Button>
                                       </PopoverTrigger>
                                       <PopoverContent className="w-auto p-0  text-text-content border bg-background-active shadow-lg">
                                             <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="text-text-Content" />
                                          <div className="flex m-auto bg-background-active justify-evenly py-3">
                                                <button type="button" className="bg-custom-button-success w-20 h-8 rounded-xl border text-text-Content border-white bg-transparent">Hủy</button>
                                                <button type="button" className="bg-custom-button-success w-20 h-8 rounded-xl " >Xác nhận</button>
                                          </div>
                                       </PopoverContent>

                                 </Popover>

                                </div>
                                <div className="flex-1 flex items-center justify-center mx-2">
                                <Select>
                                    <SelectTrigger className="w-[180px] text-text-Content">
                                       <SelectValue placeholder="Loại báo cáo" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-background-active text-text-Content">
                                       <SelectItem value="light">Kết quả kinh doanh</SelectItem>
                                       <SelectItem value="dark">Cân đối kế toán</SelectItem>
                                       <SelectItem value="system">Lưu chuyển tiền tệ</SelectItem>
                                    </SelectContent>
                                 </Select>
                                 </div>
                                <div id="reset" className="flex-1 flex items-center justify-center mx-2">
                                    <div className="flex items-center cursor-pointer p-2 rounded hover:bg-background-theme hover:shadow-md transition-all duration-200">
                                        <svg className="lucide lucide-rotate-ccw text-text-link" xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                            <path d="M3 3v5h5" />
                                        </svg>
                                        <span className="ml-1 text-text-link text-sm">Đặt lại tất cả</span>
                                    </div>
                                </div>
                        </div>
                     </div>
                     <div className="w-[1281px] h-auto bg-[#274241] rounded-tl-[14px] rounded-tr-[14px] flex flex-col border border-[#274241] mt-10">
                        {/* Header */}
                        <div className="flex justify-between px-4 py-2 bg-[#274241] text-white  rounded-tr-[14px]  rounded-tl-[14px]">
                           <div className="w-1/6 opacity-90 text-white text-xs font-medium font-['Nunito Sans']">MÃ CP</div>
                           <div className="w-1/6 opacity-90 text-white text-xs font-medium font-['Nunito Sans']">LOẠI BÁO CÁO</div>
                           <div className="w-1/6 opacity-90 text-white text-xs font-medium font-['Nunito Sans']">CẬP NHẬT LẦN CUỐI</div>
                           <div className="w-1/6 opacity-90 text-white text-xs font-medium font-['Nunito Sans']">KỲ BÁO CÁO</div>
                           <div className="w-1/6 opacity-90 text-white text-xs font-medium font-['Nunito Sans']">TÌNH TRẠNG CẬP NHẬT</div>
                           <div className="w-1/6 opacity-90 text-white text-xs font-medium font-['Nunito Sans']">HÀNH ĐỘNG</div>
                        </div>
                        {/* Body */}
                        <div className="w-[1280px] h-auto bg-background-active flex-col border-t border-[#8a8a8a]">
                        {
                           dataStatements.map((item: any) => (
                              <React.Fragment key={`${item.symbol}-${item.year}-${item.quarter}`}>
                                    <div className="flex justify-between px-4 py-2 items-center">
                                       <div className="w-1/6 text-text-Content text-xs font-normal font-['Inter']">{item.symbol}</div>
                                       <div className="w-1/6 text-text-Content text-xs font-normal font-['Nunito Sans']">Lưu chuyển tiền tệ</div>
                                       <div className="w-1/6 text-text-Content text-sm font-medium font-['Inter']">---</div>
                                       <div className="w-1/6 text-text-Content text-xs font-normal font-['Inter']">Quý {item.quarter} năm {item.year}</div>
                                       <div className="w-1/6 text-center text-white">
                                          <button className="bg-custom-button-warning font-normal font-['Inter'] text-xs float-start rounded-md p-1">
                                                Đang cập nhật
                                          </button>
                                       </div>
                                       <div className="w-1/6 flex gap-2">
                                          <div className="w-[30px] h-[30px] bg-white border border-[#8a8a8a] rounded-lg"></div>
                                          <div className="w-[30px] h-[30px] bg-white border border-[#8a8a8a] rounded-lg"></div>
                                          <div className="w-[30px] h-[30px] bg-white border border-[#8a8a8a] rounded-lg"></div>
                                       </div>
                                    </div>
                                    <div className="border-t border-[#8a8a8a]"></div>
                              </React.Fragment>
                           ))
                        }

                        </div>
                        </div>

                  </div>
               </div>
            </div>

               
            </AuthenticatedLayout>
      </>
    )
}