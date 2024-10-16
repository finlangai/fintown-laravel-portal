import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/UI/breadcrumb";
export default function Dashboard() {
  return (
    <AuthenticatedLayout header={true}>
      <Head title="Dashboard" />
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
                  <BreadcrumbPage className="text-white">
                    Dashboad
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <p>nội dung trang Dashboard</p>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
