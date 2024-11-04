import DrawerWrapper, {
  DrawerWrapperHandler,
} from "@/Components/Specialized/drawer-wrapper";
import { useCriteriaCard } from "@/Contexts/CriteriaCardContext";
import { FC, useRef } from "react";
import EditClusterInfo from "../EditClusterInfo";
import ClusterCard from "./ClusterCard";
import DropArea from "./DropArea";

type ClusterSlotContainerProps = {
  clusterInfo: CriteriaCluster;
  clusterIndex: number;
  isSingleItem: boolean;
  isLastItem: boolean;
};
const ClusterSlotContainer: FC<ClusterSlotContainerProps> = ({
  clusterInfo,
  clusterIndex,
  isSingleItem,
  isLastItem,
}) => {
  const drawerRef = useRef<DrawerWrapperHandler>(null);
  const { setDropPositionId, setActiveClusterId } = useCriteriaCard();

  return (
    <>
      {isSingleItem && (
        <DropArea
          onDragOver={(e) => {
            e.preventDefault();
            setDropPositionId(isLastItem ? clusterIndex - 1 : clusterIndex);
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
            onDragStart={() => setActiveClusterId(clusterIndex)}
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
            clusterIndex={clusterIndex}
            clusterInfo={clusterInfo}
          />
        </section>
      </DrawerWrapper>
    </>
  );
};

export default ClusterSlotContainer;
