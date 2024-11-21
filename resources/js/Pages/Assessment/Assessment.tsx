import AssessmentCard from "@/Components/Sections/Assessment/AssessmentCard";
import { PaginationWrapper } from "@/Components/Specialized/pagination-wrapper";
import TooltipWrapper from "@/Components/Specialized/tooltip-wrapper";
import { Input } from "@/Components/UI/input";
import { TypographyH1 } from "@/Components/UI/typography";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Search } from "lucide-react";
import { FormEvent } from "react";

export interface AssessmentProps {
  paginationData: Pagination<Assessment & { company: Company }>;
}

export default function Assessment({ paginationData }: AssessmentProps) {
  const { setData, submit } = useForm({
    searchSymbol: "",
  });
  const searchSymbol = (e: FormEvent) => {
    e.preventDefault();
    submit("get", route("assessments.index"));
  };

  return (
    <Authenticated
      header={true}
      className="flex flex-col gap-12 px-12 pt-10 pb-16"
    >
      {/* PAGE TITLE */}
      <Head title="Kết quả nhận định" />
      {/* === HEADER */}
      {/* HEADER TITLE */}
      <TypographyH1>Kết quả dự báo</TypographyH1>
      <div className="flex justify-between items-center">
        <form onSubmit={searchSymbol}>
          <div id="symbol-search-wrapper" className="relative flex min-w-96">
            <Search className="top-1/2 left-3 absolute -translate-y-1/2 size-5" />
            <Input
              placeholder="Tìm kiếm bằng mã cổ phiếu"
              className="shadow-md h-12 ps-12"
              onChange={({ target: { value } }) =>
                setData("searchSymbol", value)
              }
            />
          </div>
        </form>
        <PaginationWrapper paginationData={paginationData} />
      </div>

      {/* === ASSESSMENT LIST */}
      <div id="assessment-container" className="gap-5 grid grid-cols-3">
        {paginationData.data.map((cardData, index) => (
          <TooltipWrapper
            key={index}
            tooltip={`Xem chi tiết nhận định mã ${cardData.symbol}`}
          >
            <Link href={route("assessments.show", cardData.symbol)}>
              <AssessmentCard {...cardData} />
            </Link>
          </TooltipWrapper>
        ))}
      </div>
      {/* END ASSESSMENT LIST === */}
    </Authenticated>
  );
}
