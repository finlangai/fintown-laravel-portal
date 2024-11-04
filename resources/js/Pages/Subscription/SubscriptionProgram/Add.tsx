import { Button } from "@/Components/UI/button";
import { Input } from "@/Components/UI/input";
import { TypographyH1 } from "@/Components/UI/typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React, { useCallback, useState } from "react";
export default function AddSubscriptionProgram({
  user_types = [
    { id: 1, name: "Basic" },
    { id: 2, name: "Professional" },
    { id: 3, name: "Partner" },
  ],
  /* In the provided PHP code snippet, the line `"user_types" => ,` is attempting
  to pass the variable `` to the view when rendering it using Inertia. However,
  in the `create()` method of the `SubscriptionProgramController`, the variable
  `` is commented out and not defined or assigned any value. */
  program,
}: {
  user_types?: any;
  program?: any;
}) {
  const isEditMode = Boolean(program);

  const [formData, setFormData] = useState(() => {
    if (isEditMode) {
      return {
        incharge_id: program.incharge_id,
        name: program.name,
        description: program.description,
        price: program.price,
        discount: program.discount,
        duration: program.duration,
        duration_type: program.duration_type,
        is_renewable: program.is_renewable,
      };
    } else {
      return {
        incharge_id: "",
        name: "",
        description: "",
        price: 0,
        discount: 0,
        duration: 0,
        duration_type: "day",
        is_renewable: false,
      };
    }
  });

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const target = e.target as HTMLInputElement | HTMLSelectElement;
      const { name, value, type } = target;
      // Nếu phần tử là checkbox, sử dụng checked; nếu không, dùng value
      if (type === "number") {
        // Convert to number and ensure it's positive
        const numValue = Math.abs(parseFloat(value));
        setFormData((prev) => ({
          ...prev,
          [name]: isNaN(numValue) ? 0 : numValue,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]:
            target.type === "checkbox"
              ? (target as HTMLInputElement).checked
              : value,
        }));
      }
    },
    [formData],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditMode) {
      router.put(
        route("subscription.programs.update", { id: program.id }),
        formData,
      );
    } else {
      router.post(route("subscription.programs.store"), formData);
    }
  };

  return (
    <>
      <AuthenticatedLayout header={true}>
        <Head title="Chỉnh sửa gói đăng ký" />
        <div className="pt-10 pb-20">
          <div className="mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col gap-[24px] min-h-[86vh] text-text-Content">
              <div className="flex flex-col gap-[24px]">
                <TypographyH1>
                  {isEditMode ? "Sửa chương trình" : "Thêm chương trình"}
                </TypographyH1>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-[24px] mt-6"
                >
                  <div className="flex flex-row gap-[24px] w-full">
                    {/* Nội dung bên trái */}
                    <div className="flex flex-col gap-[32px] bg-white shadow-md px-[30px] py-[24px] rounded-lg w-4/6 h-full">
                      <div>
                        <div className="flex items-center py-[12px]">
                          <label htmlFor="name" className="relative w-2/5">
                            <span className="bottom-1 left-[-8px] absolute text-red-500">
                              *
                            </span>
                            Tên chương trình
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            required
                          ></Input>
                        </div>
                        <div className="flex items-center py-[12px]">
                          <label htmlFor="price" className="relative w-2/5">
                            <span className="bottom-1 left-[-8px] absolute text-red-500">
                              *
                            </span>
                            Giá tiền
                          </label>
                          <div className="relative w-full">
                            <Input
                              id="price"
                              name="price"
                              value={formData.price}
                              onChange={handleChange}
                              type="number"
                              required
                              min="0"
                            ></Input>
                            <div className="right-0 text-right absolute inset-y-0 flex items-center bg-surface-container-lowest pr-4 pl-2 rounded-r-lg pointer-events-none">
                              đ
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center py-[12px]">
                          <label htmlFor="discount" className="w-2/5">
                            Giảm giá
                          </label>
                          <div className="relative w-full">
                            <Input
                              id="discount"
                              name="discount"
                              value={formData.discount}
                              onChange={handleChange}
                              type="number"
                              required
                              min={0}
                              max={100}
                            ></Input>
                            <div className="right-0 text-right absolute inset-y-0 flex items-center bg-surface-container-lowest pr-4 pl-2 rounded-r-lg pointer-events-none">
                              %
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center py-[12px]">
                          <label htmlFor="duration_type" className="w-2/5">
                            Kiểu duy trì
                          </label>
                          <select
                            id="duration_type"
                            name="duration_type"
                            value={formData.duration_type}
                            onChange={handleChange}
                            className="flex border-neutral-200 dark:border-neutral-800 file:border-0 bg-transparent file:bg-transparent disabled:opacity-50 shadow-sm px-3 py-1 border rounded-md focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300 w-full h-9 file:font-medium text-sm dark:file:text-neutral-50 dark:placeholder:text-neutral-400 file:text-neutral-950 file:text-sm placeholder:text-neutral-500 transition-colors focus-visible:outline-none disabled:cursor-not-allowed"
                          >
                            <option value="day">Ngày</option>
                            <option value="month">Tháng</option>
                            <option value="year">Năm</option>
                          </select>
                        </div>
                        <div className="flex items-center py-[12px]">
                          <label htmlFor="duration" className="relative w-2/5">
                            <span className="bottom-1 left-[-8px] absolute text-red-500">
                              *
                            </span>
                            Thời gian
                          </label>
                          <Input
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            type="number"
                            required
                          ></Input>
                        </div>
                        <div className="flex items-center py-[12px]">
                          <label
                            htmlFor="incharge_id"
                            className="relative w-2/5"
                          >
                            <span className="bottom-1 left-[-8px] absolute text-red-500">
                              *
                            </span>
                            Kiểu người dùng
                          </label>
                          <select
                            id="incharge_id"
                            name="incharge_id"
                            value={formData.incharge_id}
                            onChange={handleChange}
                            className="flex border-neutral-200 dark:border-neutral-800 file:border-0 bg-transparent file:bg-transparent disabled:opacity-50 shadow-sm px-3 py-1 border rounded-md focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300 w-full h-9 file:font-medium text-sm dark:file:text-neutral-50 dark:placeholder:text-neutral-400 file:text-neutral-950 file:text-sm placeholder:text-neutral-500 transition-colors focus-visible:outline-none disabled:cursor-not-allowed"
                          >
                            <option value="">Chọn kiểu người dùng</option>
                            {user_types.map((item: any) => {
                              return (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="flex items-center py-[12px]">
                          <label htmlFor="is_newable" className="w-2/5">
                            Có thể gia hạn
                          </label>
                          <div className="w-full">
                            <input
                              id="is_newable"
                              type="checkbox"
                              name="is_renewable"
                              checked={formData.is_renewable}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="flex py-[12px]">
                          <label
                            htmlFor="description"
                            className="mt-[8px] w-2/5"
                          >
                            Mô tả
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Mô tả"
                            required
                            className="border-gray-200 border-solid rounded-md w-full"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Nội dung bên phải */}
                    {/* <div className="flex-col gap-[24px] bg-surface-container-lowest drop-shadow-lg px-[24px] py-[24px] w-2/6">
                                        </div> */}
                  </div>
                  <Button
                    type="submit"
                    className="bg-accent-color hover:bg-accent-color-sub w-fit"
                  >
                    {isEditMode ? "Lưu" : "Thêm chương trình"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
