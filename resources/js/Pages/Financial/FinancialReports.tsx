import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState , ChangeEvent } from "react";
import {  Select,  SelectContent,  SelectGroup,  SelectItem,  SelectLabel,  SelectTrigger,  SelectValue, } from "@/Components/UI/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/Components/UI/alert-dialog"
  import { Button } from "@/Components/UI/Button"
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
  

  // true là thủ công false là Tải từ nguồn cấp
  const [sourceType , setSourceType] = useState<boolean>(true);
  const handleHandmade = ()=>{
        setSourceType(true);
  }
  const handleSource = ()=>{
        setSourceType(false);
  }


  // mã hồ sơ công ty
  const [stockCode, setStockCode] = useState('');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStockCode(event.target.value);
  };
 

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
          <div className="py-5">
              <div className="mx-auto sm:px-6 lg:px-8 max-w-7xl">
                  <div className="flex flex-col">
                    <div className="py-3">
                            <h2 className="text-text-Content text-2xl font-bold">Danh sách Công ty</h2>
                    </div>
                   <div className="flex justify-between items-center">
                        <div id="tool" className="flex bg-background-active border-0 rounded-[8px] w-[600px] p-4">
                                <div className="flex-1 relative flex items-center mx-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 text-white"> 
                                        <circle cx="11" cy="11" r="8" /> 
                                        <path d="m21 21-4.3-4.3" /> 
                                    </svg>
                                    <input type="text" placeholder="Mã cổ phiếu..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-3xl text-black bg-transparent placeholder-gray-500 w-full text-sm" />
                                </div>
                                <div id="date" className="flex-1 flex items-center justify-center mx-2 rounded">
                                <Select >
                                    <SelectTrigger className="w-[180px] text-text-Content border-none">
                                        <SelectValue placeholder="Ngày cập nhập" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Chọn ngày cập nhập</SelectLabel>
                                            <SelectItem value="apple">Mới nhất</SelectItem>
                                            <SelectItem value="banana">1 năm trước</SelectItem>
                                            <SelectItem value="blueberry"> 5 năm trước</SelectItem>
                                        </SelectGroup>
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
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" className="bg-custom-button-success hover:bg-slate-500 text-text-Content">Thêm công ty</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-background-active">
                            <AlertDialogHeader className="flex flex-col p-4">
                            <div className="flex space-x-2">
                                <div onClick={handleHandmade}  className="cursor-pointer hover:text-blue-500 transition-colors text-text-Content text-sm">
                                    Nguồn thủ công
                                </div> 
                                <div className="text-text-Content">|</div>
                                <div  onClick={handleSource}  className="cursor-pointer hover:text-blue-500 transition-colors text-text-Content text-sm" >
                                    Tải từ nguồn cấp
                                </div>
                            </div>
                                {sourceType ? (
                                    <AlertDialogTitle className="mt-2 text-text-Content">- Lấy hồ sơ Thủ công</AlertDialogTitle>
                                ) : (
                                    <AlertDialogTitle className="mt-2 text-text-Content">- Lấy hồ sơ công ty từ nguồn cấp</AlertDialogTitle>
                                )}
                                    <AlertDialogDescription className="text-sm">
                                       {sourceType ? (
                                        <>
                                            Đây là nội dung của thủ công
                                        </>
                                       ) : (
                                            <div className="border border-white rounded-[30px]">
                                                <div className="p-4 border-b border-white">
                                                    <input  className="bg-transparent border-none w-full h-2 text-text-Content focus:outline-none focus:ring-0 focus:border-none text-sm"
                                                     type="text" 
                                                     value={stockCode}
                                                     onChange={handleChange}
                                                     placeholder="Nhập mã cổ phiếu của công ty cần lấy ..."/>
                                                </div>
                                                <div id="listSearch" className="min-h-48">
                                                    <div className="text-text-Content flex justify-center items-center">
                                                        {stockCode.length > 0 ? 
                                                        (
                                                            <div className="flex flex-col w-full p-5">
                                                                <div className=" border border-neutral-400 rounded-xl mt-2"> 
                                                                    <div className="flex justify-between py-2 px-5">
                                                                        <h2 className="font-semibold">VNM</h2>
                                                                        <span className="bg-custom-button-success rounded-sm">
                                                                            <p className="text-sm px-5  ">Đã có</p>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className=" border border-neutral-400 rounded-xl mt-2"> 
                                                                    <div className="flex justify-between py-2 px-5">
                                                                        <h2 className="font-semibold">VNM</h2>
                                                                        <span className="bg-custom-button-success rounded-sm">
                                                                            <p className="text-sm px-5  ">Đã có</p>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className=" border border-neutral-400 rounded-xl mt-2"> 
                                                                    <div className="flex justify-between py-2 px-5">
                                                                        <h2 className="font-semibold">VNM</h2>
                                                                        <span className="bg-custom-button-success rounded-sm">
                                                                            <p className="text-sm px-5  ">Đã có</p>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : 
                                                        (
                                                            <span className="mt-16">Bạn chưa nhập mã cổ phiếu!</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                       )}
                                    </AlertDialogDescription>
                            </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>Thoát</AlertDialogCancel>
                                    <AlertDialogAction>Cập nhập</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                   </div>
                   {/* danh sách stock */}
                   <div className="listStock mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div className="item w-full p-3 bg-background-active rounded-xl">
                            <div className="flex items-center justify-between border-b border-solid border-gray-300">
                            <div className="flex justify-center items-center">
                                <img className="rounded-full w-10 h-10 object-cover" src="https://iptime.com.vn/wp-content/uploads/2018/12/logo-fpt.jpg" alt="FPT" />
                                <div className="ml-3">
                                <h2 className="text-text-Content font-bold text-2xl">FPT</h2>
                                <span className="text-text-Content font-extralight">HOSE</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex">
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line">
                                    <path d="M12 20h9" />
                                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                                    <path d="m15 5 3 3" />
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                                    <path d="M7 7h10v10" />
                                    <path d="M7 17 17 7" />
                                    </svg>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div>
                            <div className="mt-4">
                                <span className="text-xs text-text-Content-sub">Cập nhật lần cuối: <span className="text-text-link">24-9-2024</span></span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-text-Content">Hồ sơ thông tin cơ bản của công ty cổ phần FPT</p>
                            </div>
                            </div>
                        </div>
                        <div className="item w-full p-3 bg-background-active rounded-xl">
                            <div className="flex items-center justify-between border-b border-solid border-gray-300">
                            <div className="flex justify-center items-center">
                                <img className="rounded-full w-10 h-10 object-cover" src="https://iptime.com.vn/wp-content/uploads/2018/12/logo-fpt.jpg" alt="FPT" />
                                <div className="ml-3">
                                <h2 className="text-text-Content font-bold text-2xl">FPT</h2>
                                <span className="text-text-Content font-extralight">HOSE</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex">
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line">
                                    <path d="M12 20h9" />
                                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                                    <path d="m15 5 3 3" />
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                                    <path d="M7 7h10v10" />
                                    <path d="M7 17 17 7" />
                                    </svg>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div>
                            <div className="mt-4">
                                <span className="text-xs text-text-Content-sub">Cập nhật lần cuối: <span className="text-text-link">24-9-2024</span></span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-text-Content">Hồ sơ thông tin cơ bản của công ty cổ phần FPT</p>
                            </div>
                            </div>
                        </div>
                        <div className="item w-full p-3 bg-background-active rounded-xl">
                            <div className="flex items-center justify-between border-b border-solid border-gray-300">
                            <div className="flex justify-center items-center">
                                <img className="rounded-full w-10 h-10 object-cover" src="https://iptime.com.vn/wp-content/uploads/2018/12/logo-fpt.jpg" alt="FPT" />
                                <div className="ml-3">
                                <h2 className="text-text-Content font-bold text-2xl">FPT</h2>
                                <span className="text-text-Content font-extralight">HOSE</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex">
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line">
                                    <path d="M12 20h9" />
                                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                                    <path d="m15 5 3 3" />
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                                    <path d="M7 7h10v10" />
                                    <path d="M7 17 17 7" />
                                    </svg>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div>
                            <div className="mt-4">
                                <span className="text-xs text-text-Content-sub">Cập nhật lần cuối: <span className="text-text-link">24-9-2024</span></span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-text-Content">Hồ sơ thông tin cơ bản của công ty cổ phần FPT</p>
                            </div>
                            </div>
                        </div>
                        <div className="item w-full p-3 bg-background-active rounded-xl">
                            <div className="flex items-center justify-between border-b border-solid border-gray-300">
                            <div className="flex justify-center items-center">
                                <img className="rounded-full w-10 h-10 object-cover" src="https://iptime.com.vn/wp-content/uploads/2018/12/logo-fpt.jpg" alt="FPT" />
                                <div className="ml-3">
                                <h2 className="text-text-Content font-bold text-2xl">FPT</h2>
                                <span className="text-text-Content font-extralight">HOSE</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex">
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line">
                                    <path d="M12 20h9" />
                                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                                    <path d="m15 5 3 3" />
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                                    <path d="M7 7h10v10" />
                                    <path d="M7 17 17 7" />
                                    </svg>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div>
                            <div className="mt-4">
                                <span className="text-xs text-text-Content-sub">Cập nhật lần cuối: <span className="text-text-link">24-9-2024</span></span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-text-Content">Hồ sơ thông tin cơ bản của công ty cổ phần FPT</p>
                            </div>
                            </div>
                        </div>
                        <div className="item w-full p-3 bg-background-active rounded-xl">
                            <div className="flex items-center justify-between border-b border-solid border-gray-300">
                            <div className="flex justify-center items-center">
                                <img className="rounded-full w-10 h-10 object-cover" src="https://iptime.com.vn/wp-content/uploads/2018/12/logo-fpt.jpg" alt="FPT" />
                                <div className="ml-3">
                                <h2 className="text-text-Content font-bold text-2xl">FPT</h2>
                                <span className="text-text-Content font-extralight">HOSE</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex">
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line">
                                    <path d="M12 20h9" />
                                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                                    <path d="m15 5 3 3" />
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                                    <path d="M7 7h10v10" />
                                    <path d="M7 17 17 7" />
                                    </svg>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div>
                            <div className="mt-4">
                                <span className="text-xs text-text-Content-sub">Cập nhật lần cuối: <span className="text-text-link">24-9-2024</span></span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-text-Content">Hồ sơ thông tin cơ bản của công ty cổ phần FPT</p>
                            </div>
                            </div>
                        </div>
                        <div className="item w-full p-3 bg-background-active rounded-xl">
                            <div className="flex items-center justify-between border-b border-solid border-gray-300">
                            <div className="flex justify-center items-center">
                                <img className="rounded-full w-10 h-10 object-cover" src="https://iptime.com.vn/wp-content/uploads/2018/12/logo-fpt.jpg" alt="FPT" />
                                <div className="ml-3">
                                <h2 className="text-text-Content font-bold text-2xl">FPT</h2>
                                <span className="text-text-Content font-extralight">HOSE</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex">
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line">
                                    <path d="M12 20h9" />
                                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                                    <path d="m15 5 3 3" />
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                                    <path d="M7 7h10v10" />
                                    <path d="M7 17 17 7" />
                                    </svg>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div>
                            <div className="mt-4">
                                <span className="text-xs text-text-Content-sub">Cập nhật lần cuối: <span className="text-text-link">24-9-2024</span></span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-text-Content">Hồ sơ thông tin cơ bản của công ty cổ phần FPT</p>
                            </div>
                            </div>
                        </div>
                        <div className="item w-full p-3 bg-background-active rounded-xl">
                            <div className="flex items-center justify-between border-b border-solid border-gray-300">
                            <div className="flex justify-center items-center">
                                <img className="rounded-full w-10 h-10 object-cover" src="https://iptime.com.vn/wp-content/uploads/2018/12/logo-fpt.jpg" alt="FPT" />
                                <div className="ml-3">
                                <h2 className="text-text-Content font-bold text-2xl">FPT</h2>
                                <span className="text-text-Content font-extralight">HOSE</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex">
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line">
                                    <path d="M12 20h9" />
                                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                                    <path d="m15 5 3 3" />
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                                    <path d="M7 7h10v10" />
                                    <path d="M7 17 17 7" />
                                    </svg>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div>
                            <div className="mt-4">
                                <span className="text-xs text-text-Content-sub">Cập nhật lần cuối: <span className="text-text-link">24-9-2024</span></span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-text-Content">Hồ sơ thông tin cơ bản của công ty cổ phần FPT</p>
                            </div>
                            </div>
                        </div>
                        <div className="item w-full p-3 bg-background-active rounded-xl">
                            <div className="flex items-center justify-between border-b border-solid border-gray-300">
                            <div className="flex justify-center items-center">
                                <img className="rounded-full w-10 h-10 object-cover" src="https://iptime.com.vn/wp-content/uploads/2018/12/logo-fpt.jpg" alt="FPT" />
                                <div className="ml-3">
                                <h2 className="text-text-Content font-bold text-2xl">FPT</h2>
                                <span className="text-text-Content font-extralight">HOSE</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex">
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line">
                                    <path d="M12 20h9" />
                                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                                    <path d="m15 5 3 3" />
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                                    <path d="M7 7h10v10" />
                                    <path d="M7 17 17 7" />
                                    </svg>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div>
                            <div className="mt-4">
                                <span className="text-xs text-text-Content-sub">Cập nhật lần cuối: <span className="text-text-link">24-9-2024</span></span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-text-Content">Hồ sơ thông tin cơ bản của công ty cổ phần FPT</p>
                            </div>
                            </div>
                        </div>
                        <div className="item w-full p-3 bg-background-active rounded-xl">
                            <div className="flex items-center justify-between border-b border-solid border-gray-300">
                            <div className="flex justify-center items-center">
                                <img className="rounded-full w-10 h-10 object-cover" src="https://iptime.com.vn/wp-content/uploads/2018/12/logo-fpt.jpg" alt="FPT" />
                                <div className="ml-3">
                                <h2 className="text-text-Content font-bold text-2xl">FPT</h2>
                                <span className="text-text-Content font-extralight">HOSE</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex">
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line">
                                    <path d="M12 20h9" />
                                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                                    <path d="m15 5 3 3" />
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                                    <path d="M7 7h10v10" />
                                    <path d="M7 17 17 7" />
                                    </svg>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div>
                            <div className="mt-4">
                                <span className="text-xs text-text-Content-sub">Cập nhật lần cuối: <span className="text-text-link">24-9-2024</span></span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-text-Content">Hồ sơ thông tin cơ bản của công ty cổ phần FPT</p>
                            </div>
                            </div>
                        </div>
                        <div className="item w-full p-3 bg-background-active rounded-xl">
                            <div className="flex items-center justify-between border-b border-solid border-gray-300">
                            <div className="flex justify-center items-center">
                                <img className="rounded-full w-10 h-10 object-cover" src="https://iptime.com.vn/wp-content/uploads/2018/12/logo-fpt.jpg" alt="FPT" />
                                <div className="ml-3">
                                <h2 className="text-text-Content font-bold text-2xl">FPT</h2>
                                <span className="text-text-Content font-extralight">HOSE</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex">
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line">
                                    <path d="M12 20h9" />
                                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                                    <path d="m15 5 3 3" />
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                                    <path d="M7 7h10v10" />
                                    <path d="M7 17 17 7" />
                                    </svg>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div>
                            <div className="mt-4">
                                <span className="text-xs text-text-Content-sub">Cập nhật lần cuối: <span className="text-text-link">24-9-2024</span></span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-text-Content">Hồ sơ thông tin cơ bản của công ty cổ phần FPT</p>
                            </div>
                            </div>
                        </div>
                        <div className="item w-full p-3 bg-background-active rounded-xl">
                            <div className="flex items-center justify-between border-b border-solid border-gray-300">
                            <div className="flex justify-center items-center">
                                <img className="rounded-full w-10 h-10 object-cover" src="https://iptime.com.vn/wp-content/uploads/2018/12/logo-fpt.jpg" alt="FPT" />
                                <div className="ml-3">
                                <h2 className="text-text-Content font-bold text-2xl">FPT</h2>
                                <span className="text-text-Content font-extralight">HOSE</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex">
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line">
                                    <path d="M12 20h9" />
                                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                                    <path d="m15 5 3 3" />
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                                    <path d="M7 7h10v10" />
                                    <path d="M7 17 17 7" />
                                    </svg>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div>
                            <div className="mt-4">
                                <span className="text-xs text-text-Content-sub">Cập nhật lần cuối: <span className="text-text-link">24-9-2024</span></span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-text-Content">Hồ sơ thông tin cơ bản của công ty cổ phần FPT</p>
                            </div>
                            </div>
                        </div>
                        <div className="item w-full p-3 bg-background-active rounded-xl">
                            <div className="flex items-center justify-between border-b border-solid border-gray-300">
                            <div className="flex justify-center items-center">
                                <img className="rounded-full w-10 h-10 object-cover" src="https://iptime.com.vn/wp-content/uploads/2018/12/logo-fpt.jpg" alt="FPT" />
                                <div className="ml-3">
                                <h2 className="text-text-Content font-bold text-2xl">FPT</h2>
                                <span className="text-text-Content font-extralight">HOSE</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex">
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line">
                                    <path d="M12 20h9" />
                                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                                    <path d="m15 5 3 3" />
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                                    <path d="M7 7h10v10" />
                                    <path d="M7 17 17 7" />
                                    </svg>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div>
                            <div className="mt-4">
                                <span className="text-xs text-text-Content-sub">Cập nhật lần cuối: <span className="text-text-link">24-9-2024</span></span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-text-Content">Hồ sơ thông tin cơ bản của công ty cổ phần FPT</p>
                            </div>
                            </div>
                        </div>
                        <div className="item w-full p-3 bg-background-active rounded-xl">
                            <div className="flex items-center justify-between border-b border-solid border-gray-300">
                            <div className="flex justify-center items-center">
                                <img className="rounded-full w-10 h-10 object-cover" src="https://iptime.com.vn/wp-content/uploads/2018/12/logo-fpt.jpg" alt="FPT" />
                                <div className="ml-3">
                                <h2 className="text-text-Content font-bold text-2xl">FPT</h2>
                                <span className="text-text-Content font-extralight">HOSE</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex">
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line">
                                    <path d="M12 20h9" />
                                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                                    <path d="m15 5 3 3" />
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                                    <path d="M7 7h10v10" />
                                    <path d="M7 17 17 7" />
                                    </svg>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div>
                            <div className="mt-4">
                                <span className="text-xs text-text-Content-sub">Cập nhật lần cuối: <span className="text-text-link">24-9-2024</span></span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-text-Content">Hồ sơ thông tin cơ bản của công ty cổ phần FPT</p>
                            </div>
                            </div>
                        </div>
                        <div className="item w-full p-3 bg-background-active rounded-xl">
                            <div className="flex items-center justify-between border-b border-solid border-gray-300">
                            <div className="flex justify-center items-center">
                                <img className="rounded-full w-10 h-10 object-cover" src="https://iptime.com.vn/wp-content/uploads/2018/12/logo-fpt.jpg" alt="FPT" />
                                <div className="ml-3">
                                <h2 className="text-text-Content font-bold text-2xl">FPT</h2>
                                <span className="text-text-Content font-extralight">HOSE</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex">
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line">
                                    <path d="M12 20h9" />
                                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                                    <path d="m15 5 3 3" />
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                                    <path d="M7 7h10v10" />
                                    <path d="M7 17 17 7" />
                                    </svg>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div>
                            <div className="mt-4">
                                <span className="text-xs text-text-Content-sub">Cập nhật lần cuối: <span className="text-text-link">24-9-2024</span></span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-text-Content">Hồ sơ thông tin cơ bản của công ty cổ phần FPT</p>
                            </div>
                            </div>
                        </div>
                        <div className="item w-full p-3 bg-background-active rounded-xl">
                            <div className="flex items-center justify-between border-b border-solid border-gray-300">
                            <div className="flex justify-center items-center">
                                <img className="rounded-full w-10 h-10 object-cover" src="https://iptime.com.vn/wp-content/uploads/2018/12/logo-fpt.jpg" alt="FPT" />
                                <div className="ml-3">
                                <h2 className="text-text-Content font-bold text-2xl">FPT</h2>
                                <span className="text-text-Content font-extralight">HOSE</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex">
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line">
                                    <path d="M12 20h9" />
                                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                                    <path d="m15 5 3 3" />
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-white flex justify-center items-center rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                                    <path d="M7 7h10v10" />
                                    <path d="M7 17 17 7" />
                                    </svg>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div>
                            <div className="mt-4">
                                <span className="text-xs text-text-Content-sub">Cập nhật lần cuối: <span className="text-text-link">24-9-2024</span></span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-text-Content">Hồ sơ thông tin cơ bản của công ty cổ phần FPT</p>
                            </div>
                            </div>
                        </div>
                    </div>







                  </div>
              </div>
          </div>
      </AuthenticatedLayout>
  );
}