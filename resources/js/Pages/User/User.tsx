import CreateBackjob from "@/Components/Sections/System/Backjobs/CreateBackjob";
import { PaginationWrapper } from "@/Components/Specialized/pagination-wrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/UI/dropdown-menu";
import { Input } from "@/Components/UI/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/UI/table";

import { TypographyH1 } from "@/Components/UI/typography";
import { UserPageProvider } from "@/Contexts/UserPageContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { capitalizeFirstChar } from "@/Lib/utils";
import { Head, router, useForm } from "@inertiajs/react";
import { EllipsisVertical, Search } from "lucide-react";
import { FormEvent } from "react";

export type UserPageProps = {
  paginating: Pagination<User & { roles: Role[] }>;
};

export default function UserPage(props: UserPageProps) {
  const { setData, data } = useForm({ search: "" });

  const searchHandler = (e: FormEvent) => {
    e.preventDefault();
    router.visit(route("users.index", { search: data.search }), {
      preserveScroll: true,
      preserveState: true,
    });
  };

  console.log(props);
  return (
    <Authenticated
      header={true}
      className="flex flex-col gap-12 px-12 pt-10 pb-16"
    >
      <UserPageProvider {...props}>
        <Head title="Danh sách khách hàng" />
        {/* PAGE HEADER */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <TypographyH1>Danh sách khách hàng</TypographyH1> <CreateBackjob />
          </div>
          <form
            id="user-search-wrapper"
            onSubmit={searchHandler}
            className="relative flex min-w-96"
          >
            <Search
              onClick={searchHandler}
              className="top-1/2 left-3 absolute -translate-y-1/2 cursor-pointer size-5"
            />
            <Input
              placeholder="Tìm kiếm bằng tên, số điện thoại hoặc email"
              className="shadow-md h-12 ps-12"
              onChange={({ target: { value } }) => setData("search", value)}
            />
          </form>
        </div>

        {/* ROLES CONTAINER */}
        <Table className="rounded-md overflow-hidden">
          <TableHeader className="bg-slate-50">
            <TableRow className="h-12">
              <TableHead className="font-bold ps-6">ID</TableHead>
              <TableHead className="font-bold">Họ tên</TableHead>
              <TableHead className="font-bold">Email</TableHead>
              <TableHead className="font-bold">Số điện thoại</TableHead>
              <TableHead className="font-bold">Gói</TableHead>
              <TableHead className="text-right font-bold pe-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* START = USERS TABLE BODY */}
            {props.paginating.data.map((user) => {
              const { id, fullname, avatar, email, phone, roles } = user;

              return (
                <TableRow key={id} className="text-slate-700">
                  <TableCell className="py-4 ps-6">{id}</TableCell>
                  <TableCell className="font-medium">{fullname}</TableCell>
                  <TableCell className="font-medium">{email}</TableCell>
                  <TableCell className="font-medium">{phone}</TableCell>
                  <TableCell className="font-medium">
                    {capitalizeFirstChar(roles[0].name)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical className="size-5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Chỉnh sửa thông tin</DropdownMenuItem>
                        <DropdownMenuItem>Đổi mật khẩu</DropdownMenuItem>
                        <DropdownMenuItem>Xóa khách hàng</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
            {/* END = USERS TABLE BODY */}
          </TableBody>
        </Table>

        {/* PAGINATION */}
        {props.paginating.data.length && (
          <PaginationWrapper
            className="mx-auto"
            paginationData={props.paginating}
          />
        )}
      </UserPageProvider>
    </Authenticated>
  );
}
