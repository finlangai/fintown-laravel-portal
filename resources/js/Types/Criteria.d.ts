type Criteria = {
  id: number;
  name: string;
  slug: string;
  group: CriteriaCluster[];
  updated_at?: string;
};

type CriteriaCluster = {
  name: string;
  metrics: string[];
};
