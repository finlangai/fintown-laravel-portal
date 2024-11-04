import DialogWrapper, {
  DialogWrapperHandler,
} from "@/Components/Specialized/dialog-wrapper";
import TextInput from "@/Components/Specialized/form/TextInput";
import { useCriteriaCard } from "@/Contexts/CriteriaCardContext";
import { cn } from "@/Lib/utils";
import { useForm } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { AddIndicator } from "./Card/AddIndicator";
import IndicatorTag from "./Cluster/IndicatorTag";

const CreateCluster = forwardRef<{ open: () => void }>((_, ref) => {
  const { post, data, setData, errors, wasSuccessful, isDirty, reset } =
    useForm<{
      name: string;
      metrics: string[];
    }>({
      name: "",
      metrics: [],
    });

  const {
    criteriaInfo: { id },
  } = useCriteriaCard();

  const dialogRef = useRef<DialogWrapperHandler>(null);

  const { indicators } = useCriteriaCard();
  const appendIndicator = (identifier: string): void => {
    const newMetrics = [...data.metrics];
    newMetrics.push(identifier);
    setData("metrics", newMetrics);
  };
  const removeIndicator = (index: number): void => {
    data.metrics.splice(index, 1);
    setData("metrics", [...data.metrics]);
  };

  const handleSubmit = () => {
    post(route("system.criterias.store-cluster", id), {
      preserveScroll: true,
      preserveState: true,
    });
  };

  // dealing with radix-ui's bug on accordion triggering dialog
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialogRef.current?.open();
      },
    };
  });

  useEffect(() => {
    if (dialogRef.current && wasSuccessful) {
      // turn off the dialog on success
      dialogRef.current.close();
      reset();
    }
  }, [wasSuccessful]);

  return (
    <DialogWrapper ref={dialogRef} trigger={<></>} title="Tạo nhóm chỉ số mới">
      <form className="flex flex-col gap-6 px-3 pt-5">
        <TextInput
          currentValue={data.name}
          error={errors.name}
          label={
            <p className="font-medium text-base text-slate-700">Tên nhóm</p>
          }
          name="name"
          setData={setData}
          placehodler="VD: Dòng tiền thiên lôi, Thanh khoản của chùa,..."
        ></TextInput>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <p className="font-medium text-base text-slate-700">
              Danh sách chỉ số
            </p>
            <AddIndicator
              trigger={
                <span className="flex items-center gap-2 border-slate-600 px-2 py-1 border border-opacity-50 rounded-lg font-bold text-slate-600 text-xs cursor-pointer">
                  <Plus className="size-3" /> Thêm chỉ số
                </span>
              }
              appendIndicator={appendIndicator}
              indicators={indicators.filter(({ identifier }) =>
                data.metrics.every(
                  (clusterIdentifier) => identifier != clusterIdentifier,
                ),
              )}
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-3">
            {!data.metrics.length ? (
              <div className="flex-1 font-medium text-red-400 text-xs">
                *Vui lòng chọn ít nhất 1 chỉ số
              </div>
            ) : (
              <>
                {data.metrics.map((identifier, index) => (
                  <IndicatorTag
                    key={index}
                    indicatorName={
                      indicators.find(
                        ({ identifier: currentIdentifier }) =>
                          currentIdentifier == identifier,
                      )?.name
                    }
                    removeHandler={() => {
                      removeIndicator(index);
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>

        {/* CREATE BUTTON */}
        <div
          onClick={() => {
            if (isDirty && data.metrics.length > 0) {
              handleSubmit();
            }
          }}
          className={cn(
            "bg-neutral-400 shadow-sm px-6 py-2 rounded-md w-fit font-bold text-sm text-white ms-auto cursor-not-allowed",
            isDirty && data.metrics.length > 0 && "bg-green-400 cursor-pointer",
          )}
        >
          Xác nhận tạo
        </div>
      </form>
    </DialogWrapper>
  );
});

export default CreateCluster;
