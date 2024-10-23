import { AssessmentDetailProps } from "@/Pages/Assessment/AssessmentDetail";
import { createContext, ReactNode, useContext, useState } from "react";

type AssessmentDetailContextProps = {
  currentCriteria: string;
  setCurrentCriteria: (criteria: string) => void;
  clusterIndex: number | null;
  setClusterIndex: (index: number | null) => void;
  overallSlug: string;
  overallTitle: string;
  insights: AssessmentInsights;
  forecasts: Forecasted[];
  getCriteriaInfo: (slug: string) => Criteria;
  positiveCriteriaCount: number;
  criteriasCount: number;
  metricInfos: MetricFormular[];
} & AssessmentDetailProps;

const AssessmentDetailContext = createContext<
  AssessmentDetailContextProps | undefined
>(undefined);

// PROVIDER
export const AssessmentDetailProvider = ({
  children,
  assessment,
  criterias,
  metricInfos,
}: {
  children: ReactNode;
} & AssessmentDetailProps) => {
  // === STATES
  const [currentCriteria, setCurrentCriteria] = useState<string>("overall");
  const [clusterIndex, setClusterIndex] = useState<null | number>(null);

  // === CUSTOM
  const overallSlug = "overall";
  const overallTitle = "Nhận Định Tổng Quan";
  const getCriteriaInfo = (slug: string): Criteria =>
    criterias.find((item) => item.slug == slug)!;

  const criteriaInsights = Object.values(assessment.insights).filter(
    (item) => typeof item != "string",
  );
  const positiveCriteriaCount = criteriaInsights.reduce(
    (acc, insight) => (insight.status == "Tích cực" ? acc + 1 : acc),
    0,
  );

  return (
    <AssessmentDetailContext.Provider
      value={{
        currentCriteria,
        setCurrentCriteria,
        positiveCriteriaCount,
        clusterIndex,
        setClusterIndex,
        overallSlug,
        overallTitle,
        assessment,
        criterias,
        insights: assessment.insights,
        forecasts: assessment.forecast,
        criteriasCount: criteriaInsights.length,
        getCriteriaInfo,
        metricInfos,
      }}
    >
      {children}
    </AssessmentDetailContext.Provider>
  );
};

export const useAssessmentDetail = () => {
  const context = useContext(AssessmentDetailContext);
  if (!context) {
    throw new Error("useCriteria must be used within a CriteriaProvider");
  }
  return context;
};
