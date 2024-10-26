import { AddButton } from "@/Components/Specialized/crud-button";
import DialogWrapper, {
  DialogWrapperHandler,
} from "@/Components/Specialized/dialog-wrapper";
import { useForm } from "@inertiajs/react";
import { FormEvent, useRef } from "react";
import BackjobFormInner from "./BackjobFormInner";

const CreateBackjob = () => {
  const { data, setData, post, errors, wasSuccessful, hasErrors } = useForm({
    name: "",
    description: null,
    job_class: "",
    is_active: false,
    parameters: "",
    interval: 1,
    interval_type: "daily",
    time: "00:00:00",
  });

  const createDialogRef = useRef<DialogWrapperHandler>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post(route("system.backjobs.store"));
    if (wasSuccessful) createDialogRef.current?.toggle();
  };
  const intervalList = ["minutely", "hourly", "daily", "weekly", "monthly"];

  return (
    <DialogWrapper
      ref={createDialogRef}
      title="Thêm Backjob"
      trigger={<AddButton />}
      footer={<AddButton onClick={handleSubmit} />}
    >
      <form className="flex flex-col gap-4 p-3" onSubmit={handleSubmit}>
        <BackjobFormInner {...{ data, errors, intervalList, setData }} />
      </form>
    </DialogWrapper>
  );
};

export default CreateBackjob;
