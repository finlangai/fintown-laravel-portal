import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/UI/accordion";
import { useCriteriaCard } from "@/Contexts/CriteriaCardContext";
import { cn } from "@/Lib/utils";
import { SquarePlus } from "lucide-react";
import { useRef, useState } from "react";
import CreateCluster from "../CreateCluster";
import CardTrigger from "./CardTrigger";
import ClusterSlotContainer from "./ClusterSlotContainer";
import DropArea from "./DropArea";

const CriteriaCard = () => {
  const {
    criteriaInfo: { id },
    clusters,
    setActiveClusterId,
    setDropPositionId,
  } = useCriteriaCard();

  const createClusterRef = useRef<{ open: () => void }>(null);
  const [isDialogInitialized, setIsDialogInitialized] =
    useState<boolean>(false);

  return (
    <>
      <AccordionItem
        value={`item-${id}`}
        className="shadow-md py-3 rounded-md group"
      >
        <AccordionTrigger className="p-6 hover:no-underline !outline-none">
          <CardTrigger />
        </AccordionTrigger>
        {/* DRAGABLE CLUSTER CARDS */}
        <AccordionContent className="flex flex-col px-8 py-6 pt-0 [&_*]:transition-all [&_*]:duration-300 [&_*]:ease-out">
          {/* START - CLUSTER CARD */}
          {clusters.map((clusterInfo, index) => (
            <ClusterSlotContainer
              key={index}
              isSingleItem={clusters.length > 1}
              isLastItem={index == clusters.length - 1}
              clusterIndex={index}
              clusterInfo={clusterInfo}
            />
          ))}
          {/* END - CLUSTER CARD */}

          {/* DROP AREA FOR LAST ITEM */}
          {clusters.length > 1 && (
            <DropArea
              onDragOver={(e) => {
                // the index of the last cluster
                e.preventDefault();
                setDropPositionId(clusters.length - 1);
              }}
            />
          )}

          {/* CREATE CLUSTER BUTTON */}
          <div className={cn("w-fit", !(clusters.length > 1) && "mt-3")}>
            <button
              type="button"
              onClick={() => {
                if (!isDialogInitialized) setIsDialogInitialized(true);
                createClusterRef.current?.open();
              }}
              className="flex items-center gap-2 border-2 border-green-300 hover:bg-green-400 shadow-sm mt-1 px-3 py-2 border-opacity-85 rounded-md w-fit font-medium text-green-400 text-sm hover:text-white transition-all duration-100 ease-out group/create-cluster-button"
            >
              <SquarePlus className="group-hover/create-cluster-button:stroke-white size-5 stroke-2 stroke-green-400" />
              Tạo nhóm mới
            </button>
            {/* <CreateCluster /> */}
          </div>
        </AccordionContent>
      </AccordionItem>
      {/* Render the Create Cluster Dialog on when needed, dealing with Accordion trigger Dialog bug also */}
      {isDialogInitialized && <CreateCluster ref={createClusterRef} />}
    </>
  );
};

export default CriteriaCard;
