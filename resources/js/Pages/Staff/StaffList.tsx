import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/UI/breadcrumb";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/UI/table";
import { Toaster } from "@/Components/UI/toaster";
import { useToast } from "@/Hooks/use-toast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import EditStaff from "./StaffFunction/EditStaff";
import ResetPasss from "./StaffFunction/ResetPassword";

export default function StaffListCRUD() {
  const { ViewstaffList, flash }: any = usePage().props;
  const { delete: deleteStaff } = useForm();
  const { toast } = useToast();
  const handleDelete = (staffId: number) => {
    deleteStaff(route("staffRemove", staffId), {
      onSuccess: () => {
        console.log("Nhân viên đã được xóa thành công!");
        toast({
          title: "Thành công!",
          description: "Nhân viên đã được xóa thành công!",
        });
      },
      onError: () => {
        console.error("Có lỗi xảy ra khi xóa nhân viên!");
        toast({
          title: "Có lỗi xảy ra!",
          description: "Không thể xóa nhân viên. Vui lòng thử lại.",
        });
      },
    });
  };

  const { data, setData, post, processing, errors } = useForm<any>({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  const isValidEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail(data.email)) {
      toast({
        title: "Có lỗi xảy ra!",
        description: "Email không hợp lệ. Vui lòng nhập email chính xác.",
      });
      return;
    }

    post("/staffAdd", {
      onSuccess: () => {
        console.log("Nhân viên đã được thêm thành công!");
        toast({
          title: "Thành công!",
          description: "Nhân viên đã được thêm thành công!",
        });
      },
      onError: () => {
        console.error("Có lỗi xảy ra khi thêm nhân viên!");
        toast({
          title: "Có lỗi xảy ra!",
          description: "Không thể thêm nhân viên. Vui lòng thử lại.",
        });
      },
    });
  };
  return (
    <AuthenticatedLayout header={true}>
      <Head title="Staff List" />
      <div className="py-5">
        <div className="mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col min-h-[86vh]">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Welcome</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">
                    Staff List
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-6">
              <Toaster />
              <div className="flex justify-between items-center my-5">
                <div>
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo họ tên..."
                    className="border-gray-300 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger className="bg-custom-button-success hover:bg-custom-button-warning shadow-md px-2 py-1 rounded-lg focus:ring-2 focus:ring-blue-300 text-white transform transition duration-200 ease-in-out hover:scale-105 focus:outline-none">
                      Thêm nhân viên
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Thêm nhân viên</DialogTitle>
                        <DialogDescription>
                          Vui lòng điền đầy đủ thông tin nhân viên.
                        </DialogDescription>
                      </DialogHeader>

                      <form onSubmit={onSubmit}>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700"
                            htmlFor="username"
                          >
                            Tên đăng nhập:
                          </label>
                          <input
                            type="text"
                            id="username"
                            value={data.username}
                            onChange={(e) =>
                              setData("username", e.target.value)
                            }
                            className={`mt-1 block w-full p-2 border rounded-md ${errors.username ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Nhập tên đăng nhập"
                          />
                          {errors.username && (
                            <span className="text-red-500 text-sm">
                              {errors.username}
                            </span>
                          )}
                        </div>

                        <div className="mb-4">
                          <label
                            className="block text-gray-700"
                            htmlFor="fullname"
                          >
                            Họ và tên:
                          </label>
                          <input
                            type="text"
                            id="fullname"
                            value={data.fullname}
                            onChange={(e) =>
                              setData("fullname", e.target.value)
                            }
                            className={`mt-1 block w-full p-2 border rounded-md ${errors.fullname ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Nhập họ và tên"
                          />
                          {errors.fullname && (
                            <span className="text-red-500 text-sm">
                              {errors.fullname}
                            </span>
                          )}
                        </div>

                        <div className="mb-4">
                          <label
                            className="block text-gray-700"
                            htmlFor="email"
                          >
                            Email:
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className={`mt-1 block w-full p-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Nhập email"
                          />
                          {errors.email && (
                            <span className="text-red-500 text-sm">
                              {errors.email}
                            </span>
                          )}
                        </div>

                        <div className="mb-4">
                          <label
                            className="block text-gray-700"
                            htmlFor="password"
                          >
                            Mật khẩu:
                          </label>
                          <input
                            type="password"
                            id="password"
                            value={data.password}
                            onChange={(e) =>
                              setData("password", e.target.value)
                            }
                            className={`mt-1 block w-full p-2 border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Nhập mật khẩu"
                          />
                          {errors.password && (
                            <span className="text-red-500 text-sm">
                              {errors.password}
                            </span>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={processing}
                          className={`bg-blue-500 text-white px-4 py-2 rounded ${processing ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          {processing ? "Đang thêm..." : "Thêm nhân viên"}
                        </button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <Table className="border-gray-200 bg-white border min-w-full">
                <TableHeader>
                  <TableRow className="bg-gray-100 text-gray-700 text-sm uppercase leading-normal">
                    <TableHead className="px-6 py-3 text-left">ID</TableHead>
                    <TableHead className="px-6 py-3 text-left">
                      Username
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left">
                      Full Name
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left">Email</TableHead>
                    <TableHead className="px-6 py-3 text-left">Tools</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ViewstaffList.map((staff: any) => (
                    <TableRow
                      key={staff.id}
                      className="hover:bg-gray-100 border-b"
                    >
                      <TableCell className="px-6 py-3">{staff.id}</TableCell>
                      <TableCell className="px-6 py-3">
                        {staff.username}
                      </TableCell>
                      <TableCell className="px-6 py-3">
                        {staff.fullname}
                      </TableCell>
                      <TableCell className="px-6 py-3">{staff.email}</TableCell>
                      <TableCell className="px-6 py-3">
                        <div className="flex space-x-2">
                          {/* đây là edit  */}
                          <EditStaff staff={staff} />

                          <Dialog>
                            <DialogTrigger>
                              {" "}
                              <Trash2 className="w-5 h-5 text-[red]" />
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Bạn có chăc chắn</DialogTitle>
                                <DialogDescription className="flex flex-col justify-center">
                                  <p className="py-6">
                                    Khi xóa dữ liệu nhân viên sẽ bị xóa khỏi hệ
                                    thống
                                  </p>
                                  <button
                                    className="bg-red-600 hover:bg-red-700 focus:ring-opacity-50 ml-32 px-4 py-2 rounded focus:ring-2 focus:ring-red-500 w-32 font-bold text-white focus:outline-none"
                                    onClick={() => handleDelete(staff.id)}
                                  >
                                    Xác nhận
                                  </button>
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>

                          <ResetPasss
                            staffId={staff.id}
                            new_password={flash.new_password}
                            id_nhanvienResetSuccess={flash.idNhanVienreset}
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
  );
}
