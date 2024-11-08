import { CreateRole } from "@/Components/Sections/Users/Roles/CreateRole";
import { EditRole } from "@/Components/Sections/Users/Roles/EditRole";
import ConfirmDelete from "@/Components/Specialized/confirm-delete";
import { DeleteButton } from "@/Components/Specialized/crud-button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/UI/table";
import { TypographyH1 } from "@/Components/UI/typography";
import { UserRolesPageProvider } from "@/Contexts/UserRolesPageContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { capitalizeFirstChar } from "@/Lib/utils";
import { Head } from "@inertiajs/react";

export type UserRolesPageProps = {
  roles: (Role & { permissions: Permission[] })[];
  permissions: Permission[];
};

export default function UserRolesPage(props: UserRolesPageProps) {
  console.log(props);
  return (
    <Authenticated
      header={true}
      className="flex flex-col gap-12 px-12 pt-10 pb-16"
    >
      <UserRolesPageProvider {...props}>
        <Head title="Cài đặt quyền hạn" />
        {/* PAGE HEADER */}
        <div className="flex items-center gap-6">
          <TypographyH1>Danh sách vai trò của khách hàng</TypographyH1>{" "}
          <CreateRole />
        </div>

        {/* ROLES CONTAINER */}
        <Table className="rounded-md overflow-hidden">
          <TableCaption>Danh sách vai trò của khách hàng</TableCaption>
          <TableHeader className="bg-slate-50">
            <TableRow className="h-12">
              <TableHead className="w-1/4 font-bold ps-6">ID</TableHead>
              <TableHead className="w-1/4 font-bold">Tên vai trò</TableHead>
              <TableHead className="w-1/4 font-bold">Số lượng quyền</TableHead>
              <TableHead className="text-right w-1/4 font-bold pe-6">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* START = ROLES TABLE BODY */}
            {props.roles.map((role) => (
              <TableRow key={role.id} className="text-slate-700">
                <TableCell className="py-4 font-medium ps-6">
                  {role.id}
                </TableCell>
                <TableCell className="font-medium">
                  {capitalizeFirstChar(role.name)}
                </TableCell>
                <TableCell className="font-medium">
                  {role.permissions.length}
                </TableCell>
                <TableCell
                  className="text-right font-medium pe-6"
                  align="right"
                >
                  <div className="flex justify-end gap-3 w-full">
                    <EditRole role={role} />
                    <ConfirmDelete
                      destroyUrl={route("users.roles.destroy", role.id)}
                      trigger={<DeleteButton className="text-xs" />}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {/* END = ROLES TABLE BODY */}
          </TableBody>
        </Table>
      </UserRolesPageProvider>
    </Authenticated>
  );
}
