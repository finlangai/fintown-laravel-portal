import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/UI/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/UI/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import AddRole from "./StaffFunction/AddRole";

export default function Staff() {
  const [searchTerm, setSearchTerm] = useState("");
  const permissionTranslations: any = {
    view_users: "Xem danh sách người dùng",
    create_users: "Tạo người dùng mới",
    edit_users: "Chỉnh sửa thông tin người dùng",
    delete_users: "Xóa người dùng",
    view_bill: "Xem hóa đơn",
    create_bill: "Tạo hóa đơn mới",
    edit_bill: "Chỉnh sửa hóa đơn",
    delete_bill: "Xóa hóa đơn",
    view_company: "Xem thông tin công ty",
    create_company: "Tạo công ty mới",
    edit_company: "Chỉnh sửa thông tin công ty",
    delete_company: "Xóa công ty",
    view_financial: "Xem thông tin tài chính",
    create_financial: "Tạo thông tin tài chính mới",
    edit_financial: "Chỉnh sửa thông tin tài chính",
    delete_financial: "Xóa thông tin tài chính",
    view_financial_index: "Xem chỉ số tài chính",
    create_financial_index: "Tạo chỉ số tài chính mới",
    edit_financial_index: "Chỉnh sửa chỉ số tài chính",
    delete_financial_index: "Xóa chỉ số tài chính",
    view_Projected_results: "Xem kết quả dự kiến",
    create_Projected_results: "Tạo kết quả dự kiến mới",
    edit_Projected_results: "Chỉnh sửa kết quả dự kiến",
    delete_Projected_results: "Xóa kết quả dự kiến",
    view_products_services: "Xem sản phẩm và dịch vụ",
    create_products_services: "Tạo sản phẩm và dịch vụ mới",
    edit_products_services: "Chỉnh sửa sản phẩm và dịch vụ",
    delete_products_services: "Xóa sản phẩm và dịch vụ",
  };
  const { staffList, role }: any = usePage().props;
  const listStaff: any = staffList || [];
  const [dataID, setDataID] = useState<number>();
  return (
    <>
      <AuthenticatedLayout header={true}>
        <Head title="Quản lý nhân viên" />
        <div className="py-5">
          <div className="mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col min-h-[86vh]">
              <div className="flex justify-between items-center mt-5">
                <div>
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo họ tên..."
                    className="border-gray-300 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="bg-white shadow-lg mt-5 rounded-lg overflow-x-auto">
                <Table>
                  <TableCaption className="font-semibold text-gray-700 text-lg">
                    Danh sách nhân viên
                  </TableCaption>
                  <TableHeader>
                    <TableRow className="bg-gray-200">
                      <TableHead className="py-3 w-[100px] text-gray-600 text-left">
                        STT
                      </TableHead>
                      <TableHead className="py-3 text-gray-600">
                        Họ tên
                      </TableHead>
                      <TableHead className="py-3 text-gray-600">
                        Tài khoản
                      </TableHead>
                      <TableHead className="py-3 text-gray-600">
                        Email
                      </TableHead>
                      <TableHead className="py-3 text-gray-600">
                        Mật khẩu
                      </TableHead>
                      <TableHead className="py-3 text-gray-600">
                        Vai trò
                      </TableHead>
                      <TableHead className="py-3 text-gray-600">
                        Quyền
                      </TableHead>
                      <TableHead className="text-right py-3 text-gray-600">
                        Phân Vai trò
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listStaff.map((item: any, index: number) => (
                      <TableRow
                        className="hover:bg-gray-100 transition duration-150"
                        key={item.id}
                      >
                        <TableCell className="font-medium text-gray-800">
                          {index + 1 || "0"}
                        </TableCell>
                        <TableCell className="text-gray-800">
                          {item.fullname || "fullname"}
                        </TableCell>
                        <TableCell className="text-gray-800">
                          {item.username || "account"}
                        </TableCell>
                        <TableCell className="text-gray-800">
                          {item.email || "email@example.com"}
                        </TableCell>
                        <TableCell className="text-gray-800">*******</TableCell>
                        <TableCell className="text-gray-800">
                          {item.roles[0] ? (
                            <span>{item.roles[0]}</span>
                          ) : (
                            <strong className="text-red-400">
                              Chưa có role
                            </strong>
                          )}
                        </TableCell>
                        <TableCell className="text-green-500">
                          <Dialog>
                            <DialogTrigger className="bg-custom-button-success rounded-md text-text-Content">
                              <span className="flex items-center p-1 font-medium text-white text-xs">
                                Xem quyền
                              </span>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Nhân viên {item.fullname}
                                </DialogTitle>
                                <DialogDescription>
                                  <ul>
                                    {item.permissions.length > 0 ? (
                                      item.permissions.map(
                                        (permission: any) => (
                                          <li key={permission}>
                                            {" "}
                                            -{" "}
                                            {permissionTranslations[
                                              permission
                                            ] || permission}
                                          </li>
                                        ),
                                      )
                                    ) : (
                                      <li>
                                        Người dùng này chưa được phân quyền
                                      </li>
                                    )}
                                  </ul>
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                        <TableCell className="text-right flex justify-end text-gray-800">
                          <div onClick={() => setDataID(item.id)}>
                            <AddRole
                              listRole={role}
                              RoleName={item.roles}
                              staffId={item.id}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
