import CreateCriteria from "@/Components/Sections/System/Criterias/CreateCriteria";
import { TypographyH1 } from "@/Components/UI/typography";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

type CriteriasPageProps = {
  criterias: Criteria[];
  indicators: { name: string; identifier: string }[];
};

export default function CriteriasPage({
  criterias,
  indicators,
}: CriteriasPageProps) {
  console.log(criterias);
  console.log(indicators);

  return (
    <Authenticated
      header={true}
      className="flex flex-col gap-12 px-12 pt-10 pb-16"
    >
      <Head title="Quản lý tiêu tiêu chí" />
      {/* PAGE HEADER */}
      <div className="flex items-center gap-6">
        <TypographyH1>Quản lý tiêu chí</TypographyH1> <CreateCriteria />
      </div>
      {/* CRITERIAS CARD CONTAINER */}
      <section className=""></section>
    </Authenticated>
  );
}
