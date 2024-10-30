import { useCriteriaCard } from "@/Contexts/CriteriaCardContext";
import { cn } from "@/Lib/utils";
import { DragEvent, HTMLAttributes, useState } from "react";

type DropAreaProps = {} & classNameInterface;

const DropArea: React.FC<DropAreaProps & HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const { activeClusterId, dropPositionId, clusters, setClusters } =
    useCriteriaCard();
  // state for drop space
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragEnter = (e: DragEvent) => {
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    setIsDraggingOver(false);
  };

  const handleOnDrop = (e: DragEvent) => {
    setIsDraggingOver(false);

    if (activeClusterId != null && dropPositionId != null) {
      let newClusters: CriteriaCluster[] = [...clusters];

      [newClusters[activeClusterId], newClusters[dropPositionId]] = [
        newClusters[dropPositionId],
        newClusters[activeClusterId],
      ];

      setClusters(newClusters);
    }
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={cn(
        "opacity-0",
        "h-0",
        "py-1.5",
        isDraggingOver &&
          "my-3 border-2 rounded-md border-dashed h-[84px] shadow-sm opacity-100",
        className,
      )}
      {...props}
    ></div>
  );
};

export default DropArea;
