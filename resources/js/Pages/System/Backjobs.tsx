import BackjobCard from "@/Components/Sections/System/Backjobs/BackjobCard";
import { AddButton } from "@/Components/Specialized/crud-button";
import { TypographyH1 } from "@/Components/UI/typography";
import { BackjobsPageProvider } from "@/Contexts/BackjobsPageContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

type BackjobsPageProps = {
  backjobs: Backjob[];
};

export default function BackjobsPage(props: BackjobsPageProps) {
  const { backjobs } = props;
  console.log(backjobs);

  return (
    <Authenticated
      header={true}
      className="flex flex-col gap-12 px-12 pt-10 pb-16"
    >
      <Head title="Quản lý Backjobs" />
      <BackjobsPageProvider {...props}>
        {/* PAGE HEADER */}
        <div className="flex items-center gap-6">
          <TypographyH1>Quản lý Backjobs</TypographyH1> <AddButton />
        </div>

        {/* BACKJOBS CARD CONTAINER */}
        <section className="gap-8 grid grid-cols-2">
          {backjobs.map((backjob, index) => (
            <BackjobCard {...backjob} key={index} />
          ))}
        </section>
      </BackjobsPageProvider>
    </Authenticated>
  );
}
