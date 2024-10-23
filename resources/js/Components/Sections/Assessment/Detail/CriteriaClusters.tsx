import { TerminalBody as StyledScrollbarDiv } from "@/Components/Terminal/TerminalBodyStyled";
import { useAssessmentDetail } from "@/Contexts/AssessmentDetailContext";
import { cn } from "@/Lib/utils";

type CriteriaClustersInterface = {} & classNameInterface;

type Cluster = {
  name: string;
  criteriaSlug: string;
  isExist: boolean;
  index: number;
};

const CriteriaClusters = ({ className }: CriteriaClustersInterface) => {
  const {
    currentCriteria,
    overallSlug,
    insights,
    criterias,
    setClusterIndex,
    setCurrentCriteria,
    clusterIndex: currentClusterIndex,
  } = useAssessmentDetail();

  const clustersList: Cluster[] = criterias.reduce(
    (acc: Cluster[], criteriaInfo) => {
      if (
        currentCriteria != overallSlug &&
        criteriaInfo.slug != currentCriteria
      )
        return acc;
      const currentClusters = criteriaInfo.group.map((cluster, index) => {
        // check if the cluster exist on the assessment
        const isExist = Boolean(insights[criteriaInfo.slug].groups[index]);
        return {
          name: cluster.name,
          criteriaSlug: criteriaInfo.slug,
          isExist,
          index,
        };
      });
      return acc.concat(currentClusters);
    },
    [],
  );

  return (
    <StyledScrollbarDiv
      className={cn(
        "flex flex-col p-5 overflow-y-scroll max-h-[36rem] rounded-lg overflow-x-hidden shadow-md",
        className,
      )}
    >
      {clustersList.map(
        ({ name, criteriaSlug, isExist, index: clusterIndex }, index) => (
          <button
            key={index}
            className={cn(
              "flex items-center gap-2 py-3 border-b rounded-md font-medium text-ellipsis text-slate-600 text-start leading-7 transition-all duration-300 ease-out group",
              isExist ? "hover:py-6 hover:text-text-active" : "text-slate-400",
              currentCriteria == criteriaSlug &&
                clusterIndex == currentClusterIndex
                ? "py-6 text-text-active"
                : "",
            )}
            disabled={!isExist}
            onClick={() => {
              setCurrentCriteria(criteriaSlug);
              setClusterIndex(clusterIndex);
            }}
          >
            {name}
          </button>
        ),
      )}
    </StyledScrollbarDiv>
  );
};

export default CriteriaClusters;
