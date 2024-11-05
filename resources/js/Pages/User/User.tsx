import CreateBackjob from "@/Components/Sections/System/Backjobs/CreateBackjob";
import { TypographyH1 } from "@/Components/UI/typography";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

type UserPageProps = {};

export default function UserPage(props: UserPageProps) {
  return (
    <Authenticated
      header={true}
      className="flex flex-col gap-12 px-12 pt-10 pb-16"
    >
      <Head title="Danh sách khách hàng" />
      {/* PAGE HEADER */}
      <div className="flex items-center gap-6">
        <TypographyH1>Danh sách khách hàng</TypographyH1> <CreateBackjob />
      </div>
    </Authenticated>
  );
}
