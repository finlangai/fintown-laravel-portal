import { Input } from "@/Components/UI/input";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Search } from "lucide-react";
import AssessmentCard from "@/Sections/Assessment/AssessmentCard";
import { AssessmentPagination } from "@/Sections/Assessment/Pagination";
import { Tooltip, TooltipContent } from "@/Components/UI/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

export interface AssessmentProps {
  paginationData: Pagination<Assessment & { company: Company }>;
}

export default function Assessment({ paginationData }: AssessmentProps) {
  return (
    <Authenticated header={true}>
      {/* PAGE TITLE */}
      <Head title="Quản lý nhận định" />
      {/* === HEADER */}
      <main className="flex flex-col gap-12 p-12 pb-16">
        {/* HEADER TITLE */}
        <h1 className="font-extrabold text-4xl text-slate-700">
          Quản lý nhận định
        </h1>
        <div className="flex justify-between items-center">
          <div id="symbol-search-wrapper" className="relative flex min-w-96">
            <Search className="top-1/2 left-3 absolute -translate-y-1/2 size-5" />
            <Input
              placeholder="Tìm kiếm mã cổ phiếu"
              className="shadow-md h-12 ps-12"
            />
          </div>
          <AssessmentPagination paginationData={paginationData} />
        </div>

        {/* === ASSESSMENT LIST */}
        <div id="assessment-container" className="gap-5 grid grid-cols-3">
          {paginationData.data.map((cardData) => (
            <Tooltip>
              <TooltipTrigger>
                <AssessmentCard {...cardData} />
              </TooltipTrigger>
              <TooltipContent>
                Xem chi tiết nhận định mã {cardData.symbol}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        {/* END ASSESSMENT LIST === */}
      </main>
    </Authenticated>
  );
}
