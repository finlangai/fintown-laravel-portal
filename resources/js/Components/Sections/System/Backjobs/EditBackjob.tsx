import { EditButton, SaveButton } from "@/Components/Specialized/crud-button";
import DialogWrapper, {
  DialogWrapperHandler,
} from "@/Components/Specialized/dialog-wrapper";
import { useForm } from "@inertiajs/react";
import { FormEvent, useRef } from "react";
import BackjobFormInner from "./BackjobFormInner";

const EditBackjob = ({
  id,
  name,
  description,
  job_class,
  is_active,
  parameters,
  interval,
  interval_type,
  time,
}: Backjob) => {
  const { data, setData, put, errors, wasSuccessful } = useForm({
    name,
    description,
    job_class,
    is_active,
    parameters,
    interval,
    interval_type,
    time,
  });

  const editDialogRef = useRef<DialogWrapperHandler>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    put(route("system.backjobs.update", id));
    if (wasSuccessful) editDialogRef.current?.toggle();
  };
  const intervalList = ["minutely", "hourly", "daily", "weekly", "monthly"];

  return (
    <DialogWrapper
      ref={editDialogRef}
      title="Chỉnh sửa Backjob"
      trigger={<EditButton />}
      footer={<SaveButton onClick={handleSubmit} />}
    >
      <form className="flex flex-col gap-4 p-3" onSubmit={handleSubmit}>
        <BackjobFormInner {...{ data, errors, intervalList, setData }} />
      </form>
    </DialogWrapper>
  );
};

export default EditBackjob;