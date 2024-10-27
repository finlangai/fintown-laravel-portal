import ActivityIndicator from "@/Components/ActivityIndicator";
import ConfirmDelete from "@/Components/Specialized/confirm-delete";
import { AddButton, EditButton } from "@/Components/Specialized/crud-button";
import { InfoField } from "@/Components/Specialized/info-field";
import { Input } from "@/Components/UI/input";
import { TypographyH1, TypographyH4 } from "@/Components/UI/typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Search } from "lucide-react";
import { useState } from "react";

interface PageProps extends InertiaPageProps {
  programs: Program[]; // Mảng các đối tượng Program
}

export default function SubscriptionProgram() {
  const { programs } = usePage<PageProps>().props;

  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyProgram, setIsEmptyProgram] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { delete: destroy } = useForm();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const filteredPrograms = programs.filter(
    (program) =>
      searchTerm === "" ||
      program.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatPrice = (price: number) => {
    return Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <AuthenticatedLayout
      header={true}
      className="flex flex-col gap-12 px-12 pt-10 pb-16"
    >
      <Head title="Thôn tin các gói đăng ký" />
      <div className="flex flex-col gap-12 min-h-[86vh] text-text-Content">
        {/*Subscription program content here */}
        <TypographyH1>Thông tin các gói đăng ký</TypographyH1>

        <div className="flex justify-between">
          <div id="symbol-search-wrapper" className="relative flex w-96">
            <Search className="top-1/2 left-3 absolute -translate-y-1/2 size-5" />
            <Input
              placeholder="Tìm kiếm gói đăng ký"
              className="shadow-md h-12 ps-12"
              onChange={handleSearchChange}
            />
          </div>
          {/* <AddButton className="bg-accent-color hover:bg-accent-color">
                THÊM CHƯƠNG TRÌNH
              </AddButton> */}
          <AddButton
            onClick={() => {
              router.visit(route("subscription.programs.create"));
            }}
            className="shadow-md h-fit font-md"
          >
            Thêm chương trình
          </AddButton>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6 rounded-lg h-fit">
          {isLoading ? (
            <ActivityIndicator />
          ) : isEmptyProgram ? (
            <div className="flex justify-center items-center w-full h-full">
              <h1 className="font-semibold text-4xl">
                Chưa có chương trình đăng ký
              </h1>
            </div>
          ) : (
            /* Subscription Program Item */
            filteredPrograms.map((program: any) => (
              <div
                className="flex justify-between items-center shadow-md p-6 border rounded-md w-full h-fit"
                key={program.id}
              >
                {/* left content */}
                <div className="flex items-center gap-[24px]">
                  <div className="flex flex-col gap-[12px]">
                    <div className="flex items-center gap-3">
                      <TypographyH4>{program.name}</TypographyH4>
                      <span className="flex justify-center items-center bg-yellow-400 p-1 rounded-md h-fit font-bold text-white text-xs">
                        - {program.discount}%
                      </span>
                    </div>
                    <div className="flex gap-6">
                      <InfoField
                        name="Thời gian hiệu lực: "
                        value={`${program.duration} ${program.duration_type}`}
                      />
                      <InfoField
                        name="Có thể làm mới: "
                        value={
                          program.is_renewable ? (
                            <span className="text-green-400">True</span>
                          ) : (
                            <span className="text-red-400">False</span>
                          )
                        }
                      />
                    </div>
                    <div className="flex gap-6">
                      <InfoField
                        name="Giá gốc: "
                        value={formatPrice(program.price)}
                      />

                      {program.discount != 0 && (
                        <InfoField
                          name="Giá sau chiết khấu: "
                          value={formatPrice(
                            program.price -
                              (program.price * program.discount) / 100,
                          )}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {/* right content */}
                <div className="flex flex-col justify-between items-end gap-12 h-full">
                  <div className="flex items-center gap-3">
                    <EditButton
                      onClick={() =>
                        router.visit(
                          route("subscription.programs.edit", program.id),
                        )
                      }
                    />
                    <ConfirmDelete
                      destroyUrl={route(
                        "subscription.programs.destroy",
                        program.id,
                      )}
                    />
                  </div>
                  <p className="text-slate-400 text-xs">
                    Cập nhật lần cuối{" "}
                    {new Date(program.updated_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
