import { FilePlus } from "lucide-react";
import DialogWrapper from "@/Components/Specialized/dialog-wrapper";
import { Button } from "@/Components/UI/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/UI/table";
import { useEffect, useState } from "react";
import { Switch } from "@/Components/UI/switch";
import { Input } from "@/Components/UI/input";
import { useForm } from "@inertiajs/react";

const RoleHasPermission = ({
  RoleName,
  allPermission,
  AllRole_Has_Permission,
  RoleID,
}: {
  RoleName: string;
  allPermission: PermissionList;
  AllRole_Has_Permission: RoleHasPermission[];
  RoleID: number;
}) => {
  const [searchPermission, setSearchPermission] = useState<string>('');
  const [listPermission] = useState<PermissionList>(allPermission);
  const { data, setData, post, put, processing } = useForm<any>({
    rolePermissions: {}, 
  });

  const containsAllChars = (name: string, search: string) => {
    let searchIndex = 0;
    const lowerName = name.toLowerCase();
    const lowerSearch = search.toLowerCase();

    for (const char of lowerName) {
      if (char === lowerSearch[searchIndex]) {
        searchIndex++;
      }
      if (searchIndex === lowerSearch.length) return true;
    }
    return searchIndex === lowerSearch.length;
  };

  const filteredPermissions = listPermission.filter((permission) =>
    containsAllChars(permission.name, searchPermission)
  );

  const highlightMatch = (name: string, search: string) => {
    const lowerName = name.toLowerCase();
    const lowerSearch = search.toLowerCase();
    const parts = lowerName.split(new RegExp(`(${lowerSearch})`, 'gi'));

    return parts.map((part, index) =>
      part.toLowerCase() === lowerSearch
        ? <span key={index} className="font-bold text-blue-500">{part}</span>
        : part
    );
  };

  const initializePermissions = () => {
    const initialPermissions: { [key: number]: boolean } = {};
    for (const permission of listPermission) {
      initialPermissions[permission.id] = getPermissionByRoleId(permission.id, RoleID);
    }
    setData('rolePermissions', initialPermissions); 
  };

  const getPermissionByRoleId = (rolePermissionIds: number, RoleID: number) => {
    const permissionIds = AllRole_Has_Permission
      .filter(rp => rp.role_id === RoleID)
      .map(rp => rp.permission_id);
    return permissionIds.includes(rolePermissionIds);
  };
  useEffect(() => {
    initializePermissions();
  }, [listPermission, AllRole_Has_Permission, RoleID]);

  const handleSwitchChange = (permissionId: number) => {
    setData('rolePermissions', {
      ...data.rolePermissions,
      [permissionId]: !data.rolePermissions[permissionId],
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    put(`/update/role/${RoleID}/permissions`, {
      rolePermissions: data.rolePermissions as any, 
      onSuccess: () => {
        console.log('success');
      },
      onError: () => {
        console.log('faller RoleHasPermission');
      },
    } as any);
  };
  return (
    <DialogWrapper
      title="Phân quyền cho Vai trò"
      trigger={
        <button className="flex items-center justify-center w-7 h-7 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200">
          <FilePlus size={17} />
        </button>
      }
    >
      <Input
        type="text"
        placeholder="Tên quyền(role)"
        value={searchPermission}
        onChange={(e) => setSearchPermission(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault();
        }}
      />
      <form onSubmit={handleSubmit}>
        <div className="overflow-auto h-[250px]">
          <Table className="min-w-full">
            <TableCaption>Phân quyền cho {RoleName}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">STT</TableHead>
                <TableHead className="w-[100px]">Tên Quyền</TableHead>
                <TableHead className="text-right">Tắt/Bật</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPermissions.map((Permission, index) => (
                <TableRow key={Permission.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    {highlightMatch(Permission.name, searchPermission)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Switch 
                      checked={data.rolePermissions[Permission.id] || false}
                      onCheckedChange={() => handleSwitchChange(Permission.id)} 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button variant="outline" className="w-1/3" type="submit" disabled={processing}>
          {processing ? 'Đang gửi...' : 'Xác nhận'}
        </Button>
      </form>
    </DialogWrapper>
  );
};

export default RoleHasPermission;
