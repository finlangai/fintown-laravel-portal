import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from '@inertiajs/react';
import './FormartTable.css'
import { Head } from "@inertiajs/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/UI/breadcrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/UI/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/UI/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/UI/select"
import { Button } from "@/Components/UI/button";
import { ChevronDown, ChevronUp, CirclePercent, Percent, Search, Send, SendHorizontal, Settings2 } from "lucide-react";
import React, { useState } from "react";
import { router } from '@inertiajs/react'
import { Toast, ToastAction } from "@/Components/UI/toast";
import { useToast } from "@/Hooks/use-toast";
import { Toaster } from "@/Components/UI/toaster";
import { Input } from "@/Components/UI/input";
import { Switch } from "@/Components/UI/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/UI/card"
import { Label } from "@/Components/UI/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/Components/UI/tabs"
import Recipe from "./Recipe";
import ViewData from "./viewData";
import EditOverview from "./editOverview";
export default function TechnicalIndicators({ technicalIndicators }: any) {
  function truncateString(str: string, maxLength: number): string {
    return str.length > maxLength ? `${str.slice(0, maxLength)}` : str;
  }
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const handleSelectChange = (value: string) => {
    if (value === "all") {
      setItemsPerPage(Object.keys(technicalIndicators).length); 
    } else {
      setItemsPerPage(Number(value));
    }
  };

  const [selectedText, setSelectedText] = useState<string | null>(null);

  const handleOpenModal = (text: string) => {
    setSelectedText(text);
  };

  const handleCloseModal = () => {
    setSelectedText(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredIndicators = technicalIndicators
    ? Object.values(technicalIndicators).filter((indicator: any) => {
        const name = indicator.name.toLowerCase();
        const displayName = indicator.display_name.toLowerCase();
        const identifier = indicator.identifier.toLowerCase();
        const search = searchTerm.toLowerCase();

        return (
          name.includes(search) ||
          displayName.includes(search) ||
          identifier.includes(search)
        );
      })
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredIndicators.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredIndicators.length / itemsPerPage);
  // code kéo thả tránh đụng hỏng nhé 
  const [draggingOrder, setDraggingOrder] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, order: string) => {
    setDraggingOrder(order); 
    console.log("Đang kéo phần tử với order:", order);
  };

  const handleDragEnd = () => {
    setDraggingOrder(null); 
    console.log("Kéo đã kết thúc");
  };
  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-b-2', 'border-[#25B770]'); 
  };
  const handleDragLeave = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.currentTarget.classList.remove('border-b-2', 'border-[#25B770]'); 
  };
  const { toast } = useToast()
  const handleDrop = async  (e: React.DragEvent<HTMLTableRowElement>, targetOrder: string) => {
    e.preventDefault();    
    if (draggingOrder && draggingOrder !== targetOrder) {
      console.log(`Đã thả phần tử có order: ${targetOrder}`);
      console.log(`Phần tử ban đầu có order: ${draggingOrder}`);  
      const giatri = {
        giatri_keo : draggingOrder,
        giatri_Tha : targetOrder,
      }
      e.currentTarget.classList.remove('border-b-2', 'border-[#25B770]'); 
      try {
        await router.post('/update/order', giatri);
        
        // Hiển thị thông báo khi cập nhật thành công
        toast({
          description: "Cập Nhập dữ liệu hiển thị Thành công",
          action: (
            <ToastAction altText="Goto schedule to undo">Đóng</ToastAction>
          ),
        })
        } catch (error) {
            // Hiển thị thông báo khi có lỗi
            toast({
              description: "Có lỗi ...",
              action: (
                <ToastAction altText="Goto schedule to undo">Đóng</ToastAction>
              ),
            })
        }
    }

  
  };
  // code xổ dữ liệu tránh đụng cấm lỗi
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleExpandRow = (order: number) => {
    setExpandedRows((prev) =>
      prev.includes(order) ? prev.filter((id) => id !== order) : [...prev, order]
    );
  };



  // gửi dữ liệu name tên tắt  lên serve 
  

  return (
    <AuthenticatedLayout header={true}>
      <Head title="Quản lý Công thức Chỉ số Kỹ thuật" />
      <div className="py-8">
        <div className="mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col min-h-[86vh]">
            <div className="border-[green]">
            <Toaster/>
            </div>
            {/* Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Trang Chủ</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/Recipe/Technical-indicators">
                    Công thức
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Quản lý công thức</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Content */}
            <div className="mt-8">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Danh sách công thức chỉ số kỹ thuật
                </h2>
                <Button variant="outline">Hướng dẫn</Button>
              </div>

              {/* Search Bar */}
              <div className="flex justify-between items-center">
                <div className="relative sm:w-1/3">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Tìm kiếm theo tên, tên viết tắt, hoặc định danh"
                    className="pl-11 border rounded-md w-full text-sm py-3"
                  />
                  <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
                    <Search strokeWidth={1} size={18} />
                  </div>
                </div>
                <div className="ml-10">
                <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[180px] h-[48px]">

                    <SelectValue placeholder="Chỉ mục hiển thị" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="all">Tất cả</SelectItem>
                  </SelectContent>
                </Select>

                </div>
                {/* Chỉnh CSS cho phân trang để căn phải */}
                <div className="ml-auto">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                        />
                      </PaginationItem>
                      {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === index + 1}
                            onClick={() => paginate(index + 1)}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
              {/* Table */}
              <Table className="mt-5">
                <TableCaption>Quản lý công thức chỉ số kĩ thuật</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">STT</TableHead>
                    <TableHead>Tên công thức</TableHead>
                    <TableHead>Tên viết tắt</TableHead>
                    <TableHead>Định danh</TableHead>
                    <TableHead className="text-right">Chức năng</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.length > 0 ? (
                    currentItems.map((congthuc: any) => (
                      <React.Fragment key={congthuc.metadata.order}>
                        {/* Table Row */}
                        <TableRow
                          draggable="true"
                          data-order={congthuc.metadata.order}
                          onDragStart={(e) => handleDragStart(e, congthuc.metadata.order)}
                          onDragEnd={handleDragEnd}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, congthuc.metadata.order)}
                          className={`hover:bg-[#e3e2e2] ${
                            draggingOrder === congthuc.metadata.order ? 'bg-gray-300' : ''
                          }`}
                        >
                          <TableCell className="font-medium w-[100px]">
                            {congthuc.metadata.order}
                          </TableCell>
                          {/* Tên công thức */}
                          <TableCell className="w-[400px] select-none">
                            <div className="flex items-center">
                              <span>{truncateString(congthuc.name || 'Công thức 1', 40)}</span>
                              {congthuc.name && congthuc.name.length > 30 && (
                                <button
                                  className="text-blue-500 ml-2"
                                  onClick={() => handleOpenModal(congthuc.name)}
                                >
                                  ...
                                </button>
                              )}
                            </div>
                          </TableCell>
                          {/* Tên viết tắt */}
                          <TableCell className="w-[300px] select-none">
                            <div className="flex items-center">
                              <span>
                                {truncateString(congthuc.display_name || 'Công thức 1', 40)}
                              </span>
                              {congthuc.display_name &&
                                congthuc.display_name.length > 40 && (
                                  <button
                                    className="text-blue-500 ml-2"
                                    onClick={() => handleOpenModal(congthuc.display_name)}
                                  >
                                    ...
                                  </button>
                                )}
                            </div>
                          </TableCell>
                          {/* Định danh */}
                          <TableCell className="w-[300px] select-none">
                            <div className="flex items-center">
                              <span>
                                {truncateString(congthuc.identifier || 'Tên định danh', 40)}
                              </span>
                              {congthuc.identifier &&
                                congthuc.identifier.length > 40 && (
                                  <button
                                    className="text-blue-500 ml-2"
                                    onClick={() => handleOpenModal(congthuc.identifier)}
                                  >
                                    ...
                                  </button>
                                )}
                            </div>
                          </TableCell>
                          
                          {/* Chức năng */}
                          <TableCell className="text-right flex justify-end">
                            <EditOverview congthuc={congthuc}/>
                            <button
                              className="border border-[gray] rounded-lg text-[gray] ml-3 w-7 h-7"
                              onClick={() => toggleExpandRow(congthuc.metadata.order)}
                            >
                              {expandedRows.includes(congthuc.metadata.order) ? (
                                <ChevronUp className="block" />
                              ) : (
                                <ChevronDown className="block" />
                              )}
                            </button>
                          </TableCell>
                        </TableRow>
                        {/* Row mở rộng */}
                        {expandedRows.includes(congthuc.metadata.order) && (
                          <TableRow
                              className={`expandable-row ${expandedRows.includes(congthuc.metadata.order) ? 'open' : ''}`}
                            >
                              <TableCell colSpan={5}>
                                <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 space-y-6 overflow-auto max-h-[600px]">
                                  {/* Thư viện các công thức */}
                                  <div className="text-gray-700 text-sm leading-relaxed">
                                        <p> {congthuc.description}</p>
                                  </div>
                                  <Tabs defaultValue="Recipe" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                      <TabsTrigger value="Recipe">Công thức chỉ số kĩ thuật</TabsTrigger>
                                      <TabsTrigger value="view">Hiển thị dữ liệu</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="Recipe">
                                      <Card>
                                        <Recipe congthuc={congthuc}/>
                                      {/* {congthuc.library.map((lib: any, index: number) => (
                                        <div key={index} className="space-y-2 p-5">
                                          <strong className="text-gradient">Công thức {congthuc.library.length > 1 ?  index + 1 : ""}</strong>
                                          <strong className="text-gradient select-none cursor-not-allowed border-2 font-bold border-gray-900 block rounded-md p-2">
                                            {` ${slugToNaturalLanguage(lib.expression)}`}
                                          </strong>
                                          <div className="flex justify-start items-center space-x-4">
                                            <Input
                                              type="text"
                                              placeholder="Nhập giá trị"
                                              value={lib.name}
                                              disabled
                                              className="border-2 select-none cursor-not-allowed font-bold border-gray-900 focus:border-blue-500 bg-white w-1/3 h-10"
                                            />
                                            <button className="border-2 font-bold border-gray-500 block rounded-md py-1 px-3 h-10  items-center justify-center hover:text-red-500 transition-all duration-300 ease-in-out transform hover:scale-105">
                                              <SendHorizontal className="text-gray-400 hover:text-red-500 transition-all duration-300 ease-in-out" />
                                            </button>
                                          </div>
                                         
                                          <div className={`space-y-2`}>
                                            <strong className="text-gray-800">Tham số:</strong>
                                            <div className="flex flex-wrap gap-2 text-gray-600">
                                              {lib.parameters.map((param: any, idx: number) => (
                                                <div key={idx} className="w-auto border-gray-600 border p-2 rounded-xl">
                                                  <p className="font-semibold text-gray-700">{param.field}</p>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      ))} */}
              
                                      </Card>
                                    </TabsContent>
                                    <TabsContent value="view">
                                        <ViewData congthuc={congthuc}/>
                                    </TabsContent>
                                  </Tabs>
                                  {/* <div className="space-y-4 flex gap-5 justify-between">
                                    <div className="w-1/2">
                                    <strong className="text-gray-800">Công thức tính toán:</strong>
                                    {congthuc.library.map((lib :any, index : number) => (
                                      <div key={index} className="space-y-2">
                                          <p className="font-semibold text-gray-700"></p>
                                          <Input
                                              type="text"
                                              placeholder="Nhập giá trị"
                                              value={` ${lib.name}`}
                                              disabled
                                              className="text-gradient border-2px  select-none cursor-not-allowed border-2 border-gray-900 focus:border-blue-500 bg-white "
                                            />  
                                            
                                          <Input
                                              type="text"
                                              placeholder="Nhập giá trị"
                                              value={` ${slugToNaturalLanguage(lib.expression)}`}
                                              disabled
                                              className="text-gradient border-2px  select-none cursor-not-allowed border-2 border-gray-900 focus:border-blue-500 bg-white "
                                            />  
                                            
                                        <div className="space-y-2">
                                          <strong className="text-gray-800">Tham số:</strong>
                                          <div className="list-disc text-gray-600">
                                            {lib.parameters.map((param : any, idx : number) => (
                                              <div key={idx}>
                                                <p className="font-semibold text-gray-700 pl-5">{param.field}</p>                                  
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    ))}   
                                    </div>
                                    <div className="w-1/2 mt-0" style={{marginTop : "0px"}}>
                                    <div className="space-y-4">
                                    <strong className="text-gray-800">Dữ liệu hiển thị :</strong>
                                          <div className="border-[gray] border rounded-lg py-3 px-3 flex justify-between items-center">
                                              <div>
                                                <span className="text-gray-800 font-bold">Hiển thị %</span>
                                                <p className="text-xs text-gray-600">Tích chọn này sẽ hiển thị nội dung theo % hoặc không</p>
                                              </div>
                                              <Switch   checked={congthuc.metadata.is_percentage} className="bg-slate-500 "/>
                                          </div>
                                          <div className="border-[gray] border rounded-lg py-3 px-3 flex justify-between items-center">
                                              <div>
                                                <span className="text-gray-800 font-bold">chia theo tỷ lệ tỷ tỷ</span>
                                                <p className="text-xs text-gray-600">Tích chọn sẽ cho phép công thức chia theo tỉ lệ tỷ tỷ</p>
                                              </div>
                                              <Switch   checked={congthuc.metadata.is_should_divine_by_billion} className="bg-slate-500 "/>
                                          </div>
                                          <div className="border-[gray] border rounded-lg py-3 px-3 flex justify-between items-center">
                                              <div>
                                                <span className="text-gray-800 font-bold">có thể xem</span>
                                                <p className="text-xs text-gray-600">Tích chọn sẽ xác định được người dùng có được phép xem công thức này </p>
                                              </div>
                                              <Switch   checked={congthuc.metadata.is_viewable} className="bg-slate-500 "/>
                                          </div>
                                          <div className="border-[gray] border rounded-lg py-3 px-3 flex justify-between items-center">
                                              <div>
                                                <span className="text-gray-800 font-bold">Trạng thái kích hoạt</span>
                                                <p className="text-xs text-gray-600">Tích chọn sẽ xác định được người dùng có được phép xem công thức này </p>
                                              </div>
                                              <Switch   checked={congthuc.metadata.is_viewable} className="bg-slate-500 "/>
                                          </div>
                                          <div className="border-[gray] border rounded-lg py-3 px-3 flex justify-between items-center">
                                              <div>
                                                <span className="text-gray-800 font-bold">Đơn vị</span>
                                                <p className="text-xs text-gray-600">Tích chọn sẽ xác định được người dùng có được phép xem công thức này </p>
                                              </div>
                                              <p className="text-gray-600">{congthuc.metadata.unit ? congthuc.metadata.unit : 'Chưa có'}</p>
                                          </div>
                                        </div>    
                                    </div>
                                  </div> */}
                                </div>
                              </TableCell>


                        </TableRow>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        Không có nội dung nào được tìm thấy
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {selectedText && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-4 rounded-lg max-w-lg w-full">
                    <h3 className="text-lg font-bold mb-4">Chi tiết nội dung</h3>
                    <p>{selectedText}</p>
                    <Button
                      variant="outline"
                      className="mt-4 px-4 py-2 ml-auto mr-5 flex justify-end rounded-lg border-[gray]"
                      onClick={handleCloseModal}
                    >
                      Đóng
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
