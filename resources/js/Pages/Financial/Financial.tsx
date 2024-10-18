import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/UI/pagination";
import DataFinancial from "@/Pages/Financial/FinancialData/dataFinancial";
import SearchFinancial from "./FinancialData/SearchComponent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/UI/breadcrumb";
export default function Financial() {
  const { statements } = usePage().props;
  const dataStatements: any = statements;
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [quy, setQuy] = React.useState<number>(NaN);
  const [nam, setNam] = React.useState<number>(NaN);

  const filteredStatements = React.useMemo(() => {
    return dataStatements.filter((statement: any) => {
      const matchesSymbol =
        searchTerm === "" ||
        statement.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      let matchesQuy = true;

      if (!isNaN(quy)) {
        matchesQuy = statement.quarter === quy;
      }

      const matchesNam = nam ? statement.year === nam : true;
      return matchesSymbol && matchesQuy && matchesNam;
    });
  }, [dataStatements, searchTerm, quy, nam, currentPage]);
  const totalPages = Math.ceil(filteredStatements.length / itemsPerPage);
  const indexOfLastStatement = currentPage * itemsPerPage;
  const indexOfFirstStatement = indexOfLastStatement - itemsPerPage;
  const currentStatements = filteredStatements.slice(
    indexOfFirstStatement,
    indexOfLastStatement,
  );
  React.useEffect(() => {
    if (filteredStatements.length === 0 || currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredStatements, totalPages]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [resetOption, SetResetOption] = React.useState(false);
  const reset = () => {
    setCurrentPage(1);
    setSearchTerm("");
    setQuy(NaN);
    setNam(NaN);
    SetResetOption(true);
  };
  return (
    <>
      <AuthenticatedLayout header={true}>
        <Head title="Financial" />
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
                    <BreadcrumbLink href="/dashboad">dashboad</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-white">
                      Financial
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="py-3">
                <h2 className="font-bold text-2xl text-text-Content">
                  Danh sách báo cáo tài chính{" "}
                </h2>
              </div>
              <div className="flex justify-between items-center">
                <div
                  id="tool"
                  className="flex border-0 bg-background-active p-4 rounded-[8px] w-[1000px]"
                >
                  <SearchFinancial
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setquy={setQuy}
                    setnam={setNam}
                    reset={resetOption}
                    SetResetOption={SetResetOption}
                  />
                  <div
                    id="reset"
                    className="flex flex-1 justify-center items-center mx-2"
                  >
                    <div
                      className="flex items-center hover:bg-background-theme hover:shadow-md p-2 rounded transition-all duration-200 cursor-pointer"
                      onClick={reset}
                    >
                      <svg
                        className="text-text-link lucide lucide-rotate-ccw"
                        xmlns="http://www.w3.org/2000/svg"
                        width={15}
                        height={15}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                      </svg>
                      <span className="ml-1 text-sm text-text-link">
                        Đặt lại tất cả
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div id="page" className="flex justify-end my-3">
                <div className="flex space-x-2 bg-background-active p-2 rounded-sm text-text-Content list-none">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={() =>
                            currentPage > 1 && handlePageChange(currentPage - 1)
                          }
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, index) => {
                        const pageNumber = index + 1;
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 2 &&
                            pageNumber <= currentPage + 2)
                        ) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                href="#"
                                onClick={() => handlePageChange(pageNumber)}
                                isActive={pageNumber === currentPage}
                                className="bg-transparent"
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}
                      {currentPage < totalPages - 1 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={() =>
                            currentPage < totalPages &&
                            handlePageChange(currentPage + 1)
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
              <DataFinancial dataStatements={currentStatements} />
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
