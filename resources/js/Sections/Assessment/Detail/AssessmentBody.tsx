import { LineChartLabel } from "@/Components/Charts/LineChartLabel";
import { cn } from "@/Lib/utils";

type AssessmentBodyInterface = {} & classNameInterface;

const AssessmentBody = ({ className }: AssessmentBodyInterface) => {
  return (
    <div className={cn("shadow-md p-5 rounded-lg", className)}>
      <LineChartLabel />
      <LineChartLabel />
      <LineChartLabel />
    </div>
  );
};

export default AssessmentBody;
