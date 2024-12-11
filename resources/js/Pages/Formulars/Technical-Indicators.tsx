import { Button } from "@/Components/UI/button";
import { Card } from "@/Components/UI/card";
import {
  Pagination,
  PaginationContent,
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
} from "@/Components/UI/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/UI/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/UI/tabs";
import { ToastAction } from "@/Components/UI/toast";
import { Toaster } from "@/Components/UI/toaster";
import { TypographyH1 } from "@/Components/UI/typography";
import { useToast } from "@/Hooks/use-toast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import React, { useState } from "react";
import EditOverview from "./editOverview";
import "./FormartTable.css";
import Recipe from "./Recipe";
import ViewData from "./viewData";
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
  const currentItems = filteredIndicators.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredIndicators.length / itemsPerPage);
  // code kéo thả tránh đụng hỏng nhé
  const [draggingOrder, setDraggingOrder] = useState<string | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLTableRowElement>,
    order: string,
  ) => {
    setDraggingOrder(order);
    console.log("Đang kéo phần tử với order:", order);
  };

  const handleDragEnd = () => {
    setDraggingOrder(null);
    console.log("Kéo đã kết thúc");
  };
  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-b-2", "border-[#25B770]");
  };
  const handleDragLeave = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.currentTarget.classList.remove("border-b-2", "border-[#25B770]");
  };
  const { toast } = useToast();
  const handleDrop = async (
    e: React.DragEvent<HTMLTableRowElement>,
    targetOrder: string,
  ) => {
    e.preventDefault();
    if (draggingOrder && draggingOrder !== targetOrder) {
      console.log(`Đã thả phần tử có order: ${targetOrder}`);
      console.log(`Phần tử ban đầu có order: ${draggingOrder}`);
      const giatri = {
        giatri_keo: draggingOrder,
        giatri_Tha: targetOrder,
      };
      e.currentTarget.classList.remove("border-b-2", "border-[#25B770]");
      try {
        await router.post(
          route("formulars.technical-indicators.edit-order"),
          giatri,
        );

        // Hiển thị thông báo khi cập nhật thành công
        toast({
          description: "Cập Nhập dữ liệu hiển thị Thành công",
          action: (
            <ToastAction altText="Goto schedule to undo">Đóng</ToastAction>
          ),
        });
      } catch (error) {
        // Hiển thị thông báo khi có lỗi
        toast({
          description: "Có lỗi ...",
          action: (
            <ToastAction altText="Goto schedule to undo">Đóng</ToastAction>
          ),
        });
      }
    }
  };
  // code xổ dữ liệu tránh đụng cấm lỗi
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleExpandRow = (order: number) => {
    setExpandedRows((prev) =>
      prev.includes(order)
        ? prev.filter((id) => id !== order)
        : [...prev, order],
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
              <Toaster />
            </div>

            {/* Content */}
            <div className="mt-8">
              <div className="flex justify-between mb-8">
                <TypographyH1>Danh sách công thức chỉ số kỹ thuật</TypographyH1>
                {/* <Button variant="outline">Hướng dẫn</Button> */}
              </div>

              {/* Search Bar */}
              <div className="flex justify-between items-center">
                <div className="relative sm:w-1/3">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Tìm kiếm theo tên, tên viết tắt, hoặc định danh"
                    className="py-3 pl-11 border rounded-md w-full text-sm"
                  />
                  <div className="top-1/2 left-4 z-10 absolute transform -translate-y-1/2">
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
                          onClick={() =>
                            currentPage > 1 && paginate(currentPage - 1)
                          }
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
                          onClick={() =>
                            currentPage < totalPages &&
                            paginate(currentPage + 1)
                          }
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
                          onDragStart={(e) =>
                            handleDragStart(e, congthuc.metadata.order)
                          }
                          onDragEnd={handleDragEnd}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, congthuc.metadata.order)}
                          className={`hover:bg-[#e3e2e2] ${
                            draggingOrder === congthuc.metadata.order
                              ? "bg-gray-300"
                              : ""
                          }`}
                        >
                          <TableCell className="w-[100px] font-medium">
                            {congthuc.metadata.order}
                          </TableCell>
                          {/* Tên công thức */}
                          <TableCell className="w-[400px] select-none">
                            <div className="flex items-center">
                              <span>
                                {truncateString(
                                  congthuc.name || "Công thức 1",
                                  40,
                                )}
                              </span>
                              {congthuc.name && congthuc.name.length > 30 && (
                                <button
                                  className="ml-2 text-blue-500"
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
                                {truncateString(
                                  congthuc.display_name || "Công thức 1",
                                  40,
                                )}
                              </span>
                              {congthuc.display_name &&
                                congthuc.display_name.length > 40 && (
                                  <button
                                    className="ml-2 text-blue-500"
                                    onClick={() =>
                                      handleOpenModal(congthuc.display_name)
                                    }
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
                                {truncateString(
                                  congthuc.identifier || "Tên định danh",
                                  40,
                                )}
                              </span>
                              {congthuc.identifier &&
                                congthuc.identifier.length > 40 && (
                                  <button
                                    className="ml-2 text-blue-500"
                                    onClick={() =>
                                      handleOpenModal(congthuc.identifier)
                                    }
                                  >
                                    ...
                                  </button>
                                )}
                            </div>
                          </TableCell>

                          {/* Chức năng */}
                          <TableCell className="text-right flex justify-end">
                            <EditOverview congthuc={congthuc} />
                            <button
                              className="border-[gray] ml-3 border rounded-lg w-7 h-7 text-[gray]"
                              onClick={() =>
                                toggleExpandRow(congthuc.metadata.order)
                              }
                            >
                              {expandedRows.includes(
                                congthuc.metadata.order,
                              ) ? (
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
                            className={`expandable-row ${expandedRows.includes(congthuc.metadata.order) ? "open" : ""}`}
                          >
                            <TableCell colSpan={5}>
                              <div className="space-y-6 border-gray-200 bg-white shadow-lg p-6 border rounded-lg max-h-[600px] overflow-auto">
                                {/* Thư viện các công thức */}
                                <div className="text-gray-700 text-sm leading-relaxed">
                                  <p> {congthuc.description}</p>
                                </div>
                                <Tabs defaultValue="Recipe" className="w-full">
                                  <TabsList className="grid grid-cols-2 w-full">
                                    <TabsTrigger value="Recipe">
                                      Công thức chỉ số kĩ thuật
                                    </TabsTrigger>
                                    <TabsTrigger value="view">
                                      Hiển thị dữ liệu
                                    </TabsTrigger>
                                  </TabsList>
                                  <TabsContent value="Recipe">
                                    <Card>
                                      <Recipe congthuc={congthuc} />
                                      {/* {congthuc.library.map((lib: any, index: number) => (
                                        <div key={index} className="space-y-2 p-5">
                                          <strong className="text-gradient">Công thức {congthuc.library.length > 1 ?  index + 1 : ""}</strong>
                                          <strong className="block border-2 border-gray-900 p-2 rounded-md font-bold text-gradient cursor-not-allowed select-none">
                                            {` ${slugToNaturalLanguage(lib.expression)}`}
                                          </strong>
                                          <div className="flex justify-start items-center space-x-4">
                                            <Input
                                              type="text"
                                              placeholder="Nhập giá trị"
                                              value={lib.name}
                                              disabled
                                              className="border-2 border-gray-900 bg-white focus:border-blue-500 w-1/3 h-10 font-bold cursor-not-allowed select-none"
                                            />
                                            <button className="block justify-center items-center border-2 border-gray-500 px-3 py-1 rounded-md h-10 font-bold hover:text-red-500 transform transition-all duration-300 ease-in-out hover:scale-105">
                                              <SendHorizontal className="text-gray-400 hover:text-red-500 transition-all duration-300 ease-in-out" />
                                            </button>
                                          </div>
                                         
                                          <div className={`space-y-2`}>
                                            <strong className="text-gray-800">Tham số:</strong>
                                            <div className="flex flex-wrap gap-2 text-gray-600">
                                              {lib.parameters.map((param: any, idx: number) => (
                                                <div key={idx} className="border-gray-600 p-2 border rounded-xl w-auto">
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
                                    <ViewData congthuc={congthuc} />
                                  </TabsContent>
                                </Tabs>
                                {/* <div className="flex justify-between gap-5 space-y-4">
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
                                              className="border-2 border-2px border-gray-900 bg-white focus:border-blue-500 text-gradient cursor-not-allowed select-none"
                                            />  
                                            
                                          <Input
                                              type="text"
                                              placeholder="Nhập giá trị"
                                              value={` ${slugToNaturalLanguage(lib.expression)}`}
                                              disabled
                                              className="border-2 border-2px border-gray-900 bg-white focus:border-blue-500 text-gradient cursor-not-allowed select-none"
                                            />  
                                            
                                        <div className="space-y-2">
                                          <strong className="text-gray-800">Tham số:</strong>
                                          <div className="text-gray-600 list-disc">
                                            {lib.parameters.map((param : any, idx : number) => (
                                              <div key={idx}>
                                                <p className="pl-5 font-semibold text-gray-700">{param.field}</p>                                  
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    ))}   
                                    </div>
                                    <div className="mt-0 w-1/2" style={{marginTop : "0px"}}>
                                    <div className="space-y-4">
                                    <strong className="text-gray-800">Dữ liệu hiển thị :</strong>
                                          <div className="flex justify-between items-center border-[gray] px-3 py-3 border rounded-lg">
                                              <div>
                                                <span className="font-bold text-gray-800">Hiển thị %</span>
                                                <p className="text-gray-600 text-xs">Tích chọn này sẽ hiển thị nội dung theo % hoặc không</p>
                                              </div>
                                              <Switch   checked={congthuc.metadata.is_percentage} className="bg-slate-500"/>
                                          </div>
                                          <div className="flex justify-between items-center border-[gray] px-3 py-3 border rounded-lg">
                                              <div>
                                                <span className="font-bold text-gray-800">chia theo tỷ lệ tỷ tỷ</span>
                                                <p className="text-gray-600 text-xs">Tích chọn sẽ cho phép công thức chia theo tỉ lệ tỷ tỷ</p>
                                              </div>
                                              <Switch   checked={congthuc.metadata.is_should_divine_by_billion} className="bg-slate-500"/>
                                          </div>
                                          <div className="flex justify-between items-center border-[gray] px-3 py-3 border rounded-lg">
                                              <div>
                                                <span className="font-bold text-gray-800">có thể xem</span>
                                                <p className="text-gray-600 text-xs">Tích chọn sẽ xác định được người dùng có được phép xem công thức này </p>
                                              </div>
                                              <Switch   checked={congthuc.metadata.is_viewable} className="bg-slate-500"/>
                                          </div>
                                          <div className="flex justify-between items-center border-[gray] px-3 py-3 border rounded-lg">
                                              <div>
                                                <span className="font-bold text-gray-800">Trạng thái kích hoạt</span>
                                                <p className="text-gray-600 text-xs">Tích chọn sẽ xác định được người dùng có được phép xem công thức này </p>
                                              </div>
                                              <Switch   checked={congthuc.metadata.is_viewable} className="bg-slate-500"/>
                                          </div>
                                          <div className="flex justify-between items-center border-[gray] px-3 py-3 border rounded-lg">
                                              <div>
                                                <span className="font-bold text-gray-800">Đơn vị</span>
                                                <p className="text-gray-600 text-xs">Tích chọn sẽ xác định được người dùng có được phép xem công thức này </p>
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
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                  <div className="bg-white p-4 rounded-lg w-full max-w-lg">
                    <h3 className="mb-4 font-bold text-lg">
                      Chi tiết nội dung
                    </h3>
                    <p>{selectedText}</p>
                    <Button
                      variant="outline"
                      className="flex justify-end border-[gray] mt-4 mr-5 ml-auto px-4 py-2 rounded-lg"
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
