import { TypographyH1 } from "@/Components/UI/typography";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function BackjobsPage() {
  return (
    <Authenticated
      header={true}
      className="flex flex-col gap-12 px-12 pt-10 pb-16"
    >
      <Head title="Quản lý Backjobs" />;{/* PAGE HEADER */}
      <TypographyH1>Kết quả nhận định</TypographyH1>
    </Authenticated>
  );
}
