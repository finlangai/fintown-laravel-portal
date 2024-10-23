import AssessmentBody from "@/Components/Sections/Assessment/Detail/AssessmentBody";
import AssessmentCriterias from "@/Components/Sections/Assessment/Detail/AssessmentCriterias";
import CriteriaClusters from "@/Components/Sections/Assessment/Detail/CriteriaClusters";
import InfoTopbar from "@/Components/Sections/Assessment/Detail/InfoTopbar";
import { TypographyH1 } from "@/Components/UI/typography";
import { AssessmentDetailProvider } from "@/Contexts/AssessmentDetailContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Undo2 } from "lucide-react";

export interface AssessmentDetailProps {
  assessment: Assessment & { company: Company };
  criterias: Criteria[];
}

export default function AssessmentDetail(props: AssessmentDetailProps) {
  return (
    <Authenticated
      header={true}
      className="flex flex-col gap-12 px-12 pt-10 pb-16"
    >
      <Head title={`Nhận định mã ${props.assessment.symbol}`} />
      <AssessmentDetailProvider {...props}>
        {/* PAGE HEADER */}
        <header className="flex items-center gap-8">
          {/* RETURN BUTTON */}
          <Link
            href={route("assessments.index")}
            className="flex gap-2 border-2 shadow-md px-3 py-2 rounded-lg w-fit font-medium text-slate-800"
          >
            <Undo2 /> Quay lại
          </Link>
          {/* PAGE TITLE */}
          <TypographyH1>
            Kết quả nhận định cho mã{" "}
            <span className="underline underline-offset-8">
              {props.assessment.symbol}
            </span>
          </TypographyH1>
        </header>

        {/* === MAIN CONTAINER */}
        <main className="relative flex gap-4">
          <AssessmentCriterias className="top-24 sticky h-fit" />

          <section className="flex flex-col flex-1 gap-7">
            {/* TOP BAR */}
            <InfoTopbar />

            {/* METRICS CHART AND CLUSTER */}
            <div className="flex gap-7">
              <AssessmentBody className="flex-1" />
              <CriteriaClusters className="top-24 sticky w-1/4" />
            </div>
          </section>
        </main>
      </AssessmentDetailProvider>
    </Authenticated>
  );
}
