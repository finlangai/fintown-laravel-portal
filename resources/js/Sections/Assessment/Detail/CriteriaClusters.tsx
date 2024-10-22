import { cn } from "@/Lib/utils";
import { TerminalBody as StyledScrollbarDiv } from "@/Components/Terminal/TerminalBodyStyled";

type CriteriaClustersInterface = {
  criterias: Criteria[];
  insights: AssessmentInsights;
} & classNameInterface;

type Cluster = {
  name: string;
  isExist: boolean;
};

const CriteriaClusters = ({
  criterias,
  insights,
  className,
}: CriteriaClustersInterface) => {
  const clustersList: Cluster[] = criterias.reduce(
    (acc: Cluster[], criteriaInfo) => {
      const currentClusters = criteriaInfo.group.map((cluster, index) => {
        // check if the cluster exist on the assessment
        const isExist = Boolean(insights[criteriaInfo.slug].groups[index]);
        return { name: cluster.name, isExist };
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
      {clustersList.map((cluster, index) => (
        <button
          key={index}
          className="flex items-center gap-2 py-3 hover:py-6 rounded-md font-medium text-ellipsis text-slate-700 text-start hover:text-text-active hover:text-wrap transition-all duration-300 ease-out group"
        >
          {cluster.name}
        </button>
      ))}
    </StyledScrollbarDiv>
  );
};

export default CriteriaClusters;
