import { LineChartLabel } from "@/Components/Charts/LineChartLabel";
import {
  TypographyH1,
  TypographyMuted,
  TypographyP,
} from "@/Components/UI/typography";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/Lib/utils";
import AssessmentCriterias from "@/Sections/Assessment/Detail/AssessmentCriterias";
import InfoTopbar from "@/Sections/Assessment/Detail/InfoTopbar";
import { Head, Link } from "@inertiajs/react";
import { Badge, Circle, Currency, RotateCcw, Undo2 } from "lucide-react";
import { useState } from "react";
import { TbCapsuleFilled } from "react-icons/tb";

export interface AssessmentDetailProps {
  assessment: Assessment & { company: Company };
  criterias: Criteria[];
}

export default function AssessmentDetail({
  assessment,
  criterias,
}: AssessmentDetailProps) {
  console.log(assessment);
  console.log(criterias);
  const [currentCriteria, setCurrentCriteria] = useState("overall");

  return (
    <Authenticated
      header={true}
      className="flex flex-col gap-12 px-12 pt-10 pb-16"
    >
      <Head title={`Nhận định mã ${assessment.symbol}`} />
      <header className="flex items-center gap-8">
        <Link
          href={route("assessments.index")}
          className="flex gap-2 border-2 shadow-md px-3 py-2 rounded-lg w-fit font-medium text-slate-800"
        >
          <Undo2 /> Quay lại
        </Link>
        <TypographyH1>
          Kết quả nhận định cho mã{" "}
          <span className="underline underline-offset-8">
            {assessment.symbol}
          </span>
        </TypographyH1>
      </header>
      {/* MAIN CONTAINER */}
      <main className="flex gap-12">
        <AssessmentCriterias
          insights={assessment.insights}
          criterias={criterias}
          currentCriteria={currentCriteria}
          setCurrentCriteria={setCurrentCriteria}
        />
        <section className="flex-1">
          <InfoTopbar assessment={assessment} />

          {/* METRICS CHART AND CLUSTER */}
        </section>
      </main>
    </Authenticated>
  );
}