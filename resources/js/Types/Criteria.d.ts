type Criteria = {
  id: number;
  name: string;
  slug: string;
  group: CriteriaCluster[];
};

type CriteriaCluster = {
  name: string;
  metrics: string[];
};
