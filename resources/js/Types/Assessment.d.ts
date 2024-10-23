type Assessment = {
  symbol: string;
  insights: AssessmentInsights;
  forecast: Forecasted[];
  updated_at: string;
};

type AssessmentInsights = {
  overall: string;
  [key: string]: AssessmentCriteria;
};

type AssessmentCriteria = {
  assessment: string;
  status: string;
  groups: (AssessmentCluster | null)[];
};

type AssessmentCluster = {
  assessment: string;
  status: string;
  metrics: string[];
};

type Forecasted = {
  year: number;
  metrics: { [key: string]: number };
};
