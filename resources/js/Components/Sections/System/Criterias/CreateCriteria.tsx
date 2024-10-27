import { AddButton } from "@/Components/Specialized/crud-button";
import DialogWrapper, {
  DialogWrapperHandler,
} from "@/Components/Specialized/dialog-wrapper";
import { useForm } from "@inertiajs/react";
import { FormEvent, useEffect, useRef } from "react";
import CriteriaFormInner from "./CriteriaFormInner";

const CreateCriteria = () => {
  const { data, setData, post, errors, wasSuccessful } = useForm<Criteria>({
    id: 0,
    name: "",
    slug: "",
    group: [],
  });

  const createDialogRef = useRef<DialogWrapperHandler>(null);

  //   close dialog after success
  useEffect(() => {
    if (wasSuccessful) createDialogRef.current?.toggle();
  }, [wasSuccessful]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post(route("system.criterias.store"));
  };

  return (
    <DialogWrapper
      ref={createDialogRef}
      title="Thêm Backjob"
      trigger={<AddButton children="Thêm tiêu chí" />}
      footer={<AddButton onClick={handleSubmit} />}
    >
      <form className="flex flex-col gap-4 p-3" onSubmit={handleSubmit}>
        <CriteriaFormInner {...{ data, errors, setData }} />
      </form>
    </DialogWrapper>
  );
};

export default CreateCriteria;
