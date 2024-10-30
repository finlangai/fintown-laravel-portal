import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/UI/accordion";
import { useCriteriaCard } from "@/Contexts/CriteriaCardContext";
import { Fragment } from "react/jsx-runtime";
import CardTrigger from "./CardTrigger";
import ClusterCard from "./ClusterCard";
import DropArea from "./DropArea";

const CriteriaCard = () => {
  const {
    criteriaInfo: { id },
    clusters,
    setClusters,
    activeClusterId,
    setActiveClusterId,
    dropPositionId,
    setDropPositionId,
  } = useCriteriaCard();

  return (
    <AccordionItem
      value={`item-${id}`}
      className="shadow-md py-3 rounded-md group"
    >
      <AccordionTrigger className="p-6 hover:no-underline !outline-none">
        <CardTrigger />
      </AccordionTrigger>
      {/* DRAGABLE CLUSTER CARDS */}
      <AccordionContent className="flex flex-col px-8 py-6 pt-0 [&_*]:transition-all [&_*]:duration-300 [&_*]:ease-out">
        {clusters.map((clusterInfo, index) => (
          <Fragment key={index}>
            <DropArea
              onDragOver={(e) => {
                e.preventDefault();
                setDropPositionId(
                  index == clusters.length - 1 ? index - 1 : index,
                );
              }}
            />
            <ClusterCard
              {...clusterInfo}
              className="active:opacity-50 active:border-dashed"
              draggable
              onDragStart={() => setActiveClusterId(index)}
              onDragEnd={() => {
                setActiveClusterId(null);
                setDropPositionId(null);
              }}
            />
          </Fragment>
        ))}
        {/* DROP AREA FOR LAST ITEM */}
        <DropArea
          onDragOver={(e) => {
            e.preventDefault();
            // the index of the last cluster
            setDropPositionId(clusters.length - 1);
          }}
        />
      </AccordionContent>
    </AccordionItem>
  );
};

export default CriteriaCard;
