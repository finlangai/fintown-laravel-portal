import Dropdown from "@/Components/Dropdown";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/UI/breadcrumb";
import { Separator } from "@/Components/UI/separator";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import InputComponent from "./SearchSubscriptionProgram";

export default function SubscriptionProgram() {
  return (
    <>
      <AuthenticatedLayout header={true} >
        <Head title="SubscriptionProgram" />
        <div className="py-5">
          <div className="mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col min-h-[86vh] gap-section-gap text-text-Content">
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
                    <BreadcrumbPage className="text-white">Subscription</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <h2 className="text-3xl font-bold mb-4">Chương trình đăng ký</h2>
              {/*Subscription program content here */}
              <div className="bg-background-active h-fit w-fit flex flex-row justify-between px-horizontal-padding-container
              space-x-section-gap py-vertical-padding-container rounded-lg">
                <InputComponent></InputComponent>
                <Separator orientation="vertical" className="w-[2px] h-[full] bg-outline-variant" />
                <Dropdown>
                  <Dropdown.Trigger>

                  </Dropdown.Trigger>
                  <Dropdown.Content>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  )
}