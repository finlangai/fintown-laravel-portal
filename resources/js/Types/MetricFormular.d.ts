type MetricFormularParameter = {
  field: string;
  slug: string;
  location: number;
  is_allow_negative: boolean;
};

type MetricFormularLibrary = {
  name: string;
  expression: string;
  parameters: Parameter[];
};

type MetricMetadata = {
  order: number;
  category: number;
  is_percentage: boolean;
  is_should_divine_by_billion: boolean;
  is_viewable: boolean;
  unit: string | null;
};

type MetricFormular = {
  name: string;
  name_vi: string;
  description: string;
  display_name: string;
  identifier: string;
  library: MetricFormularLibrary[];
  metadata: MetricMetadata;
};
