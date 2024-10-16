import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState , ChangeEvent, useEffect } from "react";
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
import Vn30Stocks from '@/Pages/Company/Vn30Stocks'
import InputComponent from "./SearchSymbol";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
export default function FinancialReports({ companies }: { companies: CompanyInfo[] }) {
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
 
  const [dataVN30, setDataVN30] = useState(companies);
  useEffect(() => {
    setDataVN30(companies);
  }, [companies]);

  const [filteredSymbols, setFilteredSymbols] = useState<string[]>([]);
  const handleSymbolsFiltered = (symbols: string[]) => {
    setFilteredSymbols(symbols); 
  };
  return (
      <AuthenticatedLayout header={true} >
          <Head title="Company" />
          <div className="py-5">
              <div className="mx-auto sm:px-6 lg:px-8 max-w-7xl">
                  <div className="flex flex-col min-h-[86vh]">
                  <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink  href="/">Welcome</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink  href="/dashboad">Dashboad</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-white">Company</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

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
                                    <InputComponent companies={companies} onSymbolsFiltered={handleSymbolsFiltered} />
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
                   <Vn30Stocks data={filteredSymbols.length > 0 ? filteredSymbols : dataVN30} />
                  </div>
              </div>
          </div>
      </AuthenticatedLayout>
  );
}