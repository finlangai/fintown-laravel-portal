import BackjobCards from "@/Components/Sections/System/Backjobs/BackjobCards";
import { TypographyH1 } from "@/Components/UI/typography";
import { BackjobsPageProvider } from "@/Contexts/BackjobsPageContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

type BackjobsPageProps = {
  backjobs: Backjob[];
};

export default function BackjobsPage(props: BackjobsPageProps) {
  console.log(props);
  return (
    <Authenticated
      header={true}
      className="flex flex-col gap-12 px-12 pt-10 pb-16"
    >
      <Head title="Quản lý Backjobs" />
      <BackjobsPageProvider {...props}>
        {/* PAGE HEADER */}
        <TypographyH1>Quản lý Backjobs</TypographyH1>

        {/* BACKJOBS CARD CONTAINER */}
        <section className="gap-8 grid grid-cols-2">
          <BackjobCards />
        </section>
      </BackjobsPageProvider>
    </Authenticated>
  );
}
