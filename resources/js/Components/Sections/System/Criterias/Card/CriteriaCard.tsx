import DrawerWrapper, {
  DrawerWrapperHandler,
} from "@/Components/Specialized/drawer-wrapper";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/UI/accordion";
import { useCriteriaCard } from "@/Contexts/CriteriaCardContext";
import { useRef } from "react";
import { Fragment } from "react/jsx-runtime";
import EditClusterInfo from "../EditClusterInfo";
import CardTrigger from "./CardTrigger";
import ClusterCard from "./ClusterCard";
import DropArea from "./DropArea";

const CriteriaCard = () => {
  const {
    criteriaInfo: { id },
    clusters,
    setActiveClusterId,
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
        {clusters.map((clusterInfo, index) => {
          const drawerRef = useRef<DrawerWrapperHandler>(null);

          return (
            <Fragment key={index}>
              {clusters.length > 1 && (
                <DropArea
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDropPositionId(
                      index == clusters.length - 1 ? index - 1 : index,
                    );
                  }}
                />
              )}
              <DrawerWrapper
                ref={drawerRef}
                footer={<></>}
                trigger={
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
                }
              >
                <section className="mx-auto">
                  <EditClusterInfo
                    parentDrawerRef={drawerRef}
                    clusterIndex={index}
                    clusterInfo={clusterInfo}
                  />
                </section>
              </DrawerWrapper>
            </Fragment>
          );
        })}

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
      </AccordionContent>
    </AccordionItem>
  );
};

export default CriteriaCard;
