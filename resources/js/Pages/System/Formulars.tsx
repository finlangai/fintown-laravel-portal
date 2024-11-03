import { TypographyH1 } from "@/Components/UI/typography";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export type FormularsPageProps = {};

export default function FormularsPage({}: FormularsPageProps) {
  return (
    <Authenticated
      header={true}
      className="flex flex-col gap-12 px-12 pt-10 pb-16"
    >
      <Head title="Quản lý công thức" />
      {/* PAGE HEADER */}
      <div className="flex items-center gap-6">
        <TypographyH1>Quản lý công thức</TypographyH1>
      </div>
    </Authenticated>
  );
}
