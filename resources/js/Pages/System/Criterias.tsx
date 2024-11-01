import CriteriaCard from "@/Components/Sections/System/Criterias/Card/CriteriaCard";
import { Accordion } from "@/Components/UI/accordion";
import { TypographyH1 } from "@/Components/UI/typography";
import { CriteriaCardProvider } from "@/Contexts/CriteriaCardContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export type CriteriasPageProps = {
  criterias: Criteria[];
  indicators: { name: string; identifier: string }[];
};

export default function CriteriasPage({
  criterias,
  indicators,
}: CriteriasPageProps) {
  return (
    <Authenticated
      header={true}
      className="flex flex-col gap-12 px-12 pt-10 pb-16"
    >
      <Head title="Quản lý tiêu tiêu chí" />
      {/* PAGE HEADER */}
      <div className="flex items-center gap-6">
        <TypographyH1>Quản lý tiêu chí</TypographyH1>
      </div>
      {/* CRITERIAS CARD CONTAINER */}
      <section className="">
        <Accordion
          type="single"
          collapsible
          className="flex flex-col gap-5 group/criterias"
        >
          {criterias.map((criteriaInfo, index) => (
            <CriteriaCardProvider
              indicators={indicators}
              criteriaInfo={{ ...criteriaInfo }}
              key={index}
            >
              <CriteriaCard />
            </CriteriaCardProvider>
          ))}
        </Accordion>
      </section>
    </Authenticated>
  );
}
