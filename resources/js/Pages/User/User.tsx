import ChangeUserPassword from "@/Components/Sections/User/Users/ChangeUserPassword";
import CreateUser from "@/Components/Sections/User/Users/CreateUser";
import EditUser from "@/Components/Sections/User/Users/EditUser";
import ConfirmDelete from "@/Components/Specialized/confirm-delete";
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

import ViewUserSubscriptions from "@/Components/Sections/User/Users/UserSubscription";
import ViewUserTransactions from "@/Components/Sections/User/Users/UserTransactions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/UI/select";
import { TypographyH1 } from "@/Components/UI/typography";
import { UserPageProvider } from "@/Contexts/UserPageContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { capitalizeFirstChar, getQueryParams } from "@/Lib/utils";
import { Head, router, useForm } from "@inertiajs/react";
import { EllipsisVertical, Search } from "lucide-react";
import { FormEvent } from "react";

export type UserGeneral = User & {
  roles: Role[];
  transactions: UserTransaction[];
  subscriptions: (UserSubscription & { program: SubscriptionProgram })[];
};

export type UserPageProps = {
  paginating: Pagination<UserGeneral>;
  userRoles: Role[];
};

export default function UserPage(props: UserPageProps) {
  const queryParams = getQueryParams();
  const { setData, data } = useForm({
    search: queryParams.search,
    roleId: queryParams.roleId,
  });

  const searchHandler = (e: FormEvent) => {
    e.preventDefault();
    router.visit(
      route("users.index", { search: data.search, roleId: data.roleId }),
      {
        preserveScroll: true,
        preserveState: true,
      },
    );
  };

  const roleFilterHandler = (value: string) => {
    setData("roleId", value);
    router.visit(route("users.index", { search: data.search, roleId: value }), {
      preserveScroll: true,
      preserveState: true,
    });
  };

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
            <TypographyH1>Danh sách khách hàng</TypographyH1> <CreateUser />
          </div>
          {/* HEADER LEFT */}
          <div className="flex gap-3">
            <Select onValueChange={roleFilterHandler}>
              <SelectTrigger className="shadow-md !ring-0 h-11 text-slate-700 placeholder-slate-700">
                <SelectValue placeholder="Lọc khách hàng" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="text-slate-600">
                  <SelectLabel className="text-slate-600">
                    Các loại khách hàng
                  </SelectLabel>
                  <SelectItem value="all">Tất cả</SelectItem>
                  {props.userRoles.map((role, index) => (
                    <SelectItem value={String(role.id)} key={index}>
                      {capitalizeFirstChar(role.name)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

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
                className="shadow-md py-[21px] ps-12"
                onChange={({ target: { value } }) => setData("search", value)}
              />
            </form>
          </div>
        </div>

        {/* USERS LIST CONTAINER */}
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
              const { id, fullname, email, phone, roles } = user;

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
                        {/* === ACTION TRIGGER */}
                        <EllipsisVertical className="rounded-full hover:bg-text-active hover:stroke-white py-1 transition-all duration-200 ease-out size-7" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {/* === EIDT USER INFO ACTION */}
                        <DropdownMenuItem>
                          <EditUser user={user} />
                        </DropdownMenuItem>
                        {/* === VIEW TRANSACTIONS LOG */}
                        <DropdownMenuItem>
                          <ViewUserTransactions user={user} />
                        </DropdownMenuItem>
                        {/* === VIEW SUBSCRIPTIONS */}
                        <DropdownMenuItem>
                          <ViewUserSubscriptions user={user} />
                        </DropdownMenuItem>
                        {/* === CHANGE PASSWORD ACTION */}
                        <DropdownMenuItem>
                          <ChangeUserPassword user={user} />
                        </DropdownMenuItem>
                        {/* === DELETE ACTION */}
                        <DropdownMenuItem>
                          <ConfirmDelete
                            trigger={
                              <button type="button">Xóa khách hàng</button>
                            }
                            destroyUrl={route("users.destroy", user.id)}
                            noPropogation
                            title={
                              <div className="text-base text-slate-700">
                                Bạn có chắc chắn muốn xóa khách hàng <br></br>
                                <span className="font-bold text-lg underline underline-offset-2">
                                  {user.fullname}
                                </span>{" "}
                                với email{" "}
                                <span className="font-bold text-lg underline underline-offset-2">
                                  {user.email}
                                </span>
                              </div>
                            }
                          />
                        </DropdownMenuItem>
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
