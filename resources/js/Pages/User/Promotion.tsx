import CreatePromotion from "@/Components/Sections/User/Users/Promotion/CreatePromotion";
import EditPromotion from "@/Components/Sections/User/Users/Promotion/EditPromotion";
import InfoPromotion from "@/Components/Sections/User/Users/Promotion/InfoPromotion";
import ConfirmDelete from "@/Components/Specialized/confirm-delete";
import { PaginationWrapper } from "@/Components/Specialized/pagination-wrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/UI/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/UI/table";
import { TypographyH1 } from "@/Components/UI/typography";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { formatDateToYmd } from "@/Lib/utils";
import { Head } from "@inertiajs/react";
import { EllipsisVertical } from "lucide-react";

export type PromotionCodeGeneral = {
  partner: User;
  program: SubscriptionProgram;
} & PromotionCode;

export type PromotionProps = {
  paginating: Pagination<PromotionCodeGeneral>;
  partners: User[];
  programs: SubscriptionProgram[];
};

export default function Promotion(props: PromotionProps) {
  return (
    <Authenticated
      header={true}
      className="flex flex-col gap-12 px-12 pt-10 pb-16"
    >
      <Head title="Mã giới thiệu" />
      {/* PAGE HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <TypographyH1>Danh sách mã giới thiệu</TypographyH1>{" "}
          <CreatePromotion
            partners={props.partners}
            programs={props.programs}
          />
        </div>
      </div>

      {/* USERS LIST CONTAINER */}
      <Table className="rounded-md overflow-hidden">
        <TableHeader className="bg-slate-50">
          <TableRow className="h-12">
            <TableHead className="font-bold">Mã gói</TableHead>
            <TableHead className="font-bold">Mã giới thiệu</TableHead>
            <TableHead className="font-bold">Cộng sự</TableHead>
            <TableHead className="font-bold">Giảm giá</TableHead>
            <TableHead className="font-bold">Bắt đầu</TableHead>
            <TableHead className="font-bold">Kết thúc</TableHead>
            <TableHead className="text-right font-bold pe-6"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* START = PROMOTION CODE TABLE BODY */}
          {props.paginating.data.map((promotion) => {
            const {
              id,
              partner,
              program_id,
              code,
              discount,
              start_date,
              expired_date,
            } = promotion;

            return (
              <TableRow key={id} className="text-slate-700">
                <TableCell className="font-medium">{program_id}</TableCell>
                <TableCell className="max-w-20 font-medium overflow-x-hidden pe-6">
                  <span className="line-clamp-1">{code}</span>
                </TableCell>
                <TableCell className="max-w-20 font-medium">
                  <span className="line-clamp-1">{partner.fullname}</span>
                </TableCell>
                <TableCell className="font-medium">
                  {(discount * 100).toFixed(1)}%
                </TableCell>
                <TableCell className="font-medium">
                  {start_date ? formatDateToYmd(start_date) : "Không"}
                </TableCell>
                <TableCell className="font-medium">
                  {expired_date ? formatDateToYmd(expired_date) : "Không"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      {/* === ACTION TRIGGER */}
                      <EllipsisVertical className="py-1 rounded-full hover:bg-text-active transition-all duration-200 ease-out hover:stroke-white size-7" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {/* === PROMOTION INFO */}
                      <DropdownMenuItem>
                        <InfoPromotion promotion={promotion} />
                      </DropdownMenuItem>
                      {/* === EDIT PROMOTION ACTION */}
                      <DropdownMenuItem>
                        <EditPromotion promotion={promotion} />
                      </DropdownMenuItem>
                      {/* === DELETE ACTION */}
                      <DropdownMenuItem>
                        <ConfirmDelete
                          trigger={<button type="button">Xóa</button>}
                          destroyUrl={route(
                            "users.promotion.destroy",
                            promotion.id,
                          )}
                          noPropogation
                          title={
                            <div className="text-base text-slate-700">
                              Bạn chắc chắn muốn xóa mã giới thiệu này?
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
          {/* END = PROMOTION CODE TABLE BODY */}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      {props.paginating.data.length && (
        <PaginationWrapper
          className="mx-auto"
          paginationData={props.paginating}
        />
      )}
    </Authenticated>
  );
}
