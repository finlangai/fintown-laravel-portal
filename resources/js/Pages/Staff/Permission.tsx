import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Toaster } from "@/Components/UI/toaster";
import { TypographyH1 } from "@/Components/UI/typography";
import EditRole from "./RoleFunction/EditRole";
import { useRef, useState } from "react";
import DialogWrapper from "@/Components/Specialized/dialog-wrapper";
import { CirclePlus } from "lucide-react";
import { useToast } from "@/Hooks/use-toast";
import PermissionRemove from "./PermissionFunction/PermissionRemove";
import PermissionEdit from "./PermissionFunction/PermissionEdit";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/UI/pagination"
const Permission = ({AllPermission} : {AllPermission:PermissionList}) => {
   const dialogRef = useRef<any>(null);
   const { toast } = useToast();
   const { data, setData, post, processing, errors } = useForm({
     name: '',
   });
   const handleAddRole = () => {
     post('/addPermission', {
       ...data,
       onSuccess: () => {
         dialogRef.current.toggle();
         setData({ name: '' }); 
         toast({
           title: "Thành công",
           description: "Thêm thành công vai trò",
           type: "background",

         });
       },
       onError: (error) => {
         console.error("Đã xảy ra lỗi khi thêm vai trò:", error);
       },
     });
   };

   const [ITEMS_PER_PAGE, setITEMS_PER_PAGE] = useState<number>(10);
   const [currentPage, setCurrentPage] = useState(1);
   const totalPages = Math.ceil(AllPermission.length / ITEMS_PER_PAGE);
   const paginatedPermissions = AllPermission.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

   return (
      <AuthenticatedLayout header={true}>
      <Head title="Quản lý nhân viên" />
      <Toaster/>
         <div className="py-5">
         <div className="mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col min-h-[86vh]">
               <div className="container mx-auto p-4">
               <TypographyH1>Quản Lý quyền người dùng</TypographyH1>
               <div className="flex justify-end mb-4">
                <DialogWrapper
                  trigger={
                    <button className="flex items-center bg-gray-600 text-white px-2 py-1 text-base rounded-md hover:bg-custom-button-success transition duration-200">
                      <CirclePlus className="inline h-4 w-4 mr-2" />
                      Thêm quyền
                    </button>
                  }
                  title="Thêm Vai Trò"
                  description="Vui lòng điền thông tin vai trò mới."
                  footer={
                    <button 
                      onClick={handleAddRole} 
                      className={`bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition duration-200 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`} 
                      disabled={processing}
                    >
                      {processing ? 'Đang thêm...' : 'Thêm'}
                    </button>
                  }
                  ref={dialogRef}
                >
                  <form>
                    <div className="mb-4">
                      <label className="block text-gray-700">Tên Quyền permission</label>
                      <input 
                        type="text" 
                        value={data.name} 
                        onChange={(e) => setData('name', e.target.value)} 
                        className={`border border-gray-300 p-1 focus:ring-green-500 rounded-md w-full ${errors.name ? 'border-red-500' : ''}`} 
                      />
                      <br />
                      {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>
                    {/* Xóa bỏ phần nhập liệu cho guard_name */}
                  </form>
                </DialogWrapper>
              </div>
               <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                     <thead className="bg-gray-200">
                     <tr>
                        <th className="border-b p-2 text-left text-gray-700 font-semibold text-sm">STT</th>
                        <th className="border-b p-2 text-left text-gray-700 font-semibold text-sm">Tên Quyền</th>
                        <th className="border-b p-2 text-left text-gray-700 font-semibold text-sm">Xác thực</th>
                        {/* Xóa cột Guard Name trong bảng */}
                        <th className="border-b p-2 text-left text-gray-700 font-semibold text-sm">Hành Động</th>
                     </tr>
                     </thead>
                     <tbody>
                     {paginatedPermissions.map((permission , index) => (
                        <tr key={permission.id} className="hover:bg-gray-100 transition duration-200">
                           <td className="border-b p-2 text-sm">{index+1}</td>
                           <td className="border-b p-2 text-sm">{permission.name}</td>
                           <td className="border-b p-2 text-sm">{permission.guard_name}</td>
                         
                           <td className="border-b p-2 text-sm flex space-x-2">
                              <PermissionEdit Permission={permission}/>
                              <PermissionRemove PermissionID={permission.id}/>                  
                           </td>
                        </tr>
                     ))}
                     </tbody>
                  </table>
               </div>
                  <Pagination className="my-3 flex justify-end">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                          }}
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, index) => {
                        const page = index + 1;
                        const showPage =
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1);

                        if (!showPage) return null;

                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              isActive={currentPage === page}
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(page);
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}

                      {currentPage + 1 < totalPages - 1 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
               </div>
               </div>
            </div>
         </div>
      </AuthenticatedLayout>
   )
}

export default Permission;
