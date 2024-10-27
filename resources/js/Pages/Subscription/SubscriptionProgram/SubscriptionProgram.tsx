import ActivityIndicator from "@/Components/ActivityIndicator";
import Checkbox from "@/Components/Checkbox";
import Dropdown from "@/Components/Dropdown";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/Components/UI/breadcrumb";
import { Separator } from "@/Components/UI/separator";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import AddButton from "./AddButton";
import InputComponent from "./SearchSubscriptionProgram";

interface PageProps extends InertiaPageProps {
  programs: Program[]; // Mảng các đối tượng Program
}

export default function SubscriptionProgram() {

  const { programs } = usePage<PageProps>().props;

  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyProgram, setIsEmptyProgram] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { delete: destroy } = useForm();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const filteredPrograms = programs.filter(program =>
    searchTerm === '' || program.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const formatPrice = (price: number) => {
    return Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  }

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa chương trình này không?')) {
      destroy(`/SubscriptionProgram/delete/${id}`);
    }
  };

  return (
    <>
      <AuthenticatedLayout header={true} >
        <Head title="SubscriptionProgram" />
        <div className="pt-10 pb-20">
          <div className="mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col min-h-[86vh] gap-[24px] text-text-Content">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Welcome</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboad">Dashboad</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/SubscriptionProgram">Subscription</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              {/*Subscription program content here */}
              <h1 className="text-3xl font-bold">Chương trình đăng ký</h1>
              <div className="bg-surface-container-lowest h-fit w-fit flex flex-row px-[40px]
              space-x-[24px] py-[24px] rounded-lg drop-shadow-md">
                <InputComponent onChange={handleSearchChange} />
                <Separator orientation="vertical" className="w-[2px] h-[full] bg-outline-variant bg-black" />
                <Dropdown>
                  <Dropdown.Trigger>
                    <div className="flex flex-row items-center h-[40px] min-w-[104px] justify-between">
                      <div className="select-none">Lọc</div>
                      <MdKeyboardArrowDown />
                    </div>
                  </Dropdown.Trigger>
                  {/* <Dropdown.Content>
                  </Dropdown.Content> */}
                </Dropdown>
              </div>
              <div className="flex justify-between">
                <div></div>
                <AddButton className='bg-accent-color hover:bg-accent-color'>THÊM CHƯƠNG TRÌNH</AddButton>
              </div>
              {/* Main Content */}
              <div className="h-fit rounded-lg">
                {
                  isLoading ? (<ActivityIndicator />) :
                    isEmptyProgram ?
                      <div className="w-full h-full flex justify-center items-center">
                        <h1 className="text-4xl font-semibold">Chưa có chương trình đăng ký</h1>
                      </div>
                      :
                      /* Subscription Program Item */
                      filteredPrograms.map((program: any) => (
                        <div className="bg-surface-container-lowest w-full h-fit py-[16px] px-[24px] drop-shadow-md flex justify-between items-center" key={program.id}>
                          {/* left content */}
                          <div className="flex items-center gap-[24px]">
                            <Checkbox itemID={program.id}></Checkbox>
                            <div className="flex flex-col gap-[12px]">
                              <div className="flex space-x-[24px]">
                                <div className="min-w-[250px]">{program.name}</div>
                                <div>-{program.discount}%</div>
                              </div>
                              <div className="flex space-x-[24px]">
                                <div className="w-[120px]">{formatPrice(program.price - program.price * program.discount / 100)}</div>
                                <div><s>{formatPrice(program.price)}</s></div>
                              </div>
                            </div>
                          </div>
                          {/* right content */}
                          <div className="flex space-x-[32px] items-center">
                            <div className="w-fit text-right">{
                              program.duration_type === "day" ? "Ngày" :
                                program.duration_type === "month" ? "Tháng" :
                                  "Năm"
                            }</div>
                            <div className="flex gap-[8px] items-center">
                              <Link href={route('SubscriptionProgram.edit', { id: program.id })} as="button" className="bg-blue-600 text-white px-[16px] py-[8px] rounded-md">Sửa</Link>
                              <button
                                className="bg-red-600 text-white px-[16px] py-[8px] rounded-md"
                                onClick={() => handleDelete(program.id)}
                              >Xoá</button>
                            </div>
                          </div>
                        </div>
                      ))
                }
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  )
}