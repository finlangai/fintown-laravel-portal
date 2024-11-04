import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type CriteriaCardContextProps = {
  criteriaInfo: Criteria;
  indicators: CompactIndicator[];
  clusters: CriteriaCluster[];
  setClusters: (newCluster: CriteriaCluster[]) => void;
  activeClusterId: number | null;
  setActiveClusterId: (value: number | null) => void;
  dropPositionId: number | null;
  setDropPositionId: (value: number | null) => void;
  isClustersDirty: boolean;
  setIsClustersDirty: (value: boolean) => void;
};

const CriteriaCardContext = createContext<CriteriaCardContextProps | undefined>(
  undefined,
);

type CriteriaCardProviderProps = {
  criteriaInfo: Criteria;
  indicators: CompactIndicator[];
};

export const CriteriaCardProvider = ({
  children,
  criteriaInfo,
  indicators,
}: { children: ReactNode } & CriteriaCardProviderProps) => {
  // states for drag and drop clusters
  const [clusters, setClusters] = useState<CriteriaCluster[]>(
    criteriaInfo.group,
  );
  const [activeClusterId, setActiveClusterId] = useState<number | null>(null);
  const [dropPositionId, setDropPositionId] = useState<number | null>(null);
  // checking if the clusters data has changed
  const [isClustersDirty, setIsClustersDirty] = useState<boolean>(false);

  useEffect(() => {
    const isNotDirty =
      JSON.stringify(criteriaInfo.group) === JSON.stringify(clusters);
    if (isNotDirty != isClustersDirty) setIsClustersDirty(isNotDirty);
  }, [clusters]);

  useEffect(() => {
    setClusters(criteriaInfo.group);
  }, [criteriaInfo]);

  return (
    <CriteriaCardContext.Provider
      value={{
        criteriaInfo,
        indicators,
        clusters,
        isClustersDirty,
        setIsClustersDirty,
        setClusters,
        activeClusterId,
        setActiveClusterId,
        dropPositionId,
        setDropPositionId,
      }}
    >
      {children}
    </CriteriaCardContext.Provider>
  );
};

export const useCriteriaCard = () => {
  const context = useContext(CriteriaCardContext);
  if (!context) {
    throw new Error(
      "useCriteriaCard must be used within a CriteriaCardProvider",
    );
  }
  return context;
};
