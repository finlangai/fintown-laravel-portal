import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { CirclePlus } from "lucide-react";
import DialogWrapper from "@/Components/Specialized/dialog-wrapper";
import { useForm } from '@inertiajs/react';
import { useRef } from "react";
import { useToast } from "@/Hooks/use-toast";
import { TypographyH1 } from "@/Components/UI/typography";
import { Toaster } from "@/Components/UI/toaster";
import RemoveRole from "./RoleFunction/RemoveRole";
import EditRole from "./RoleFunction/EditRole";
import Role_has_permission from "./RoleFunction/Role_has_Permission";

const Role = ({ AllRoles, allPermission, AllRole_Has_Permission }: { AllRoles: RoleList, allPermission: PermissionList, AllRole_Has_Permission: RoleHasPermission[] }) => {
  const dialogRef = useRef<any>(null);
  const { toast } = useToast();
  const { data, setData, post, processing, errors } = useForm({
    name: '', // Chỉ giữ lại trường 'name'
    // Không cần 'guard_name' nữa
  });

  const handleAddRole = () => {
    post('/addRole', {
      data: { name: data.name }, // Gửi chỉ có 'name'
      onSuccess: () => {
        dialogRef.current.toggle();
        setData({ name: '' }); // Reset lại chỉ với 'name'
        toast({
          title: "Thành công",
          description: "Thêm thành công vai trò",
        });
      },
      onError: (error) => {
        console.error("Đã xảy ra lỗi khi thêm vai trò:", error);
      },
    });
  };

  return (
    <AuthenticatedLayout header={true}>
      <Head title="Quản lý nhân viên" />
      <div className="py-5">
        <div className="mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col min-h-[86vh]">
            <div className="container mx-auto p-4">
              <TypographyH1> Quản Lý Vai Trò </TypographyH1>
              <div className="flex justify-end mb-4">
                <DialogWrapper
                  trigger={
                    <button className="flex items-center bg-gray-600 text-white px-2 py-1 rounded-md hover:bg-custom-button-success transition duration-200">
                      <CirclePlus className="inline h-4 w-4 mr-2" />
                      Thêm Vai Trò
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
                      <label className="block text-gray-700">Tên Vai Trò</label>
                      <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={`border border-gray-300 p-1 rounded-md w-full ${errors.name ? 'border-red-500' : ''}`}
                      />
                      <br />
                      {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>
                  </form>
                </DialogWrapper>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border-b p-2 text-left text-gray-700 font-semibold text-sm">ID</th>
                      <th className="border-b p-2 text-left text-gray-700 font-semibold text-sm">Tên Vai Trò</th>
                      <th className="border-b p-2 text-left text-gray-700 font-semibold text-sm">Xác thực</th>
                      <th className="border-b p-2 text-left text-gray-700 font-semibold text-sm">Phân quyền</th>
                      <th className="border-b p-2 text-left text-gray-700 font-semibold text-sm">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AllRoles.map((role) => (
                      <tr key={role.id} className="hover:bg-gray-100 transition duration-200">
                        <td className="border-b p-2 text-sm">{role.id}</td>
                        <td className="border-b p-2 text-sm">{role.name}</td>
                        <td className="border-b p-2 text-sm">{role.guard_name}</td>
                        <td className="border-b p-2 text-sm"><Role_has_permission RoleName={role.name} allPermission={allPermission} AllRole_Has_Permission={AllRole_Has_Permission} RoleID={role.id} /></td>
                        <td className="border-b p-2 text-sm flex space-x-2">
                          <EditRole Role={role} />
                          <RemoveRole RoleID={role.id} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Role;
