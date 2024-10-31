import { SaveButton } from "@/Components/Specialized/crud-button";
import {
  DrawerCloseButton,
  DrawerWrapperHandler,
} from "@/Components/Specialized/drawer-wrapper";
import { useCriteriaCard } from "@/Contexts/CriteriaCardContext";
import { toSnakeCase } from "@/Lib/utils";
import { useForm } from "@inertiajs/react";
import { PencilLine, X } from "lucide-react";
import { FC, FormEvent, RefObject, useState } from "react";
import { AddIndicator } from "./Card/AddIndicator";

type EditClusterInfoProps = {
  clusterIndex: number;
  clusterInfo: CriteriaCluster;
  parentDrawerRef: RefObject<DrawerWrapperHandler>;
};
const EditClusterInfo: FC<EditClusterInfoProps> = ({
  clusterInfo: { name, metrics },
  clusterIndex,
  parentDrawerRef,
}) => {
  const {
    indicators,
    criteriaInfo: { id: currentCriteriaId },
  } = useCriteriaCard();
  const { patch, setData, data, errors, wasSuccessful, isDirty } = useForm({
    clusterIndex,
    name,
    metrics: [...metrics],
  });
  const [isIndicatorsModified, setIsIndicatorsModified] =
    useState<boolean>(false);

  const appendIndicator = (identifier: string): void => {
    const newMetrics = [...data.metrics];
    newMetrics.push(identifier);
    setData("metrics", newMetrics);
  };
  const removeIndicator = (index: number): void => {
    data.metrics.splice(index, 1);
    setData("metrics", [...data.metrics]);
    const isModified = JSON.stringify(metrics) != JSON.stringify(data.metrics);
    if (isModified != isIndicatorsModified) setIsIndicatorsModified(isModified);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    patch(route("system.criterias.update-cluster-info", currentCriteriaId), {
      preserveScroll: true,
    });
    parentDrawerRef.current?.close();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-12 pb-6">
      <div className="relative w-full">
        <input
          id={toSnakeCase(name)}
          type="text"
          value={data.name}
          className="inline-block mx-auto border-none !ring-0 w-full font-bold text-2xl text-center text-slate-700 text-wrap"
          onChange={({ target }) => {
            const { value } = target;
            // Get current width in pixels
            const currentParentWidthPx =
              target.parentElement!.getBoundingClientRect().width;
            const chUnitWidth = parseFloat(getComputedStyle(target).fontSize);
            const calculatedWidthPx = value.length * chUnitWidth;

            if (
              calculatedWidthPx >= currentParentWidthPx &&
              calculatedWidthPx < (window.innerWidth * 2) / 3
            ) {
              target.style.width = calculatedWidthPx + "px";
            }

            setData("name", value);
          }}
        />
        <label
          htmlFor={toSnakeCase(name)}
          className="top-0 -right-6 absolute cursor-pointer"
        >
          <PencilLine className="size-5 stroke-slate-500" />
        </label>
      </div>

      <div className="flex flex-col gap-3 mx-auto w-[36rem]">
        <p className="font-semibold text-base text-slate-700">
          Danh sách chỉ số
        </p>
        {/* indicator cards container */}
        <div className="flex flex-wrap gap-2">
          {data.metrics.map((identifier, index) => (
            <span
              key={index}
              className="flex items-center gap-1 border-slate-200 px-2 py-1 border rounded-sm font-bold text-slate-600 text-xs cursor-pointer"
              onClick={() => removeIndicator(index)}
            >
              <X className="size-3 stroke-[3px]" />{" "}
              {
                // getting the names of the identifiers
                indicators.find(
                  ({ identifier: currentIdentifier }) =>
                    currentIdentifier == identifier,
                )?.name
              }
            </span>
          ))}

          <AddIndicator
            appendIndicator={appendIndicator}
            indicators={indicators.filter(({ identifier }) =>
              metrics.every(
                (clusterIdentifier) => identifier != clusterIdentifier,
              ),
            )}
          />
        </div>
      </div>

      <div className="flex justify-center gap-3">
        {isDirty || isIndicatorsModified ? (
          <>
            <DrawerCloseButton className="bg-slate-400 mx-0 px-3 text-white">
              Hủy thay đổi
            </DrawerCloseButton>
            <SaveButton />
          </>
        ) : (
          <DrawerCloseButton />
        )}
      </div>
    </form>
  );
};

export default EditClusterInfo;
