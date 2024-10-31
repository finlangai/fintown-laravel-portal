import { EditButton, SaveButton } from "@/Components/Specialized/crud-button";
import TextInput from "@/Components/Specialized/form/TextInput";
import {
  SheetWrapper,
  SheetWrapperHandler,
} from "@/Components/Specialized/sheet-wrapper";
import { useCriteriaCard } from "@/Contexts/CriteriaCardContext";
import { useForm } from "@inertiajs/react";
import { FormEvent, useEffect, useRef } from "react";

const EditCriteriaInfo = () => {
  const { id, name, slug } = useCriteriaCard().criteriaInfo;
  const { patch, setData, data, wasSuccessful, errors } = useForm({
    name,
    slug,
  });

  const sheetRef = useRef<SheetWrapperHandler>(null);

  useEffect(() => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  }, [wasSuccessful]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    patch(route("system.criterias.update", id));
  };

  return (
    <span onClick={(e) => e.stopPropagation()}>
      <SheetWrapper
        title={<span>Chỉnh sửa thông tin tiêu chí</span>}
        trigger={<EditButton asDiv={true} className="h-fit" />}
        footer={<SaveButton onClick={handleSubmit} />}
        ref={sheetRef}
      >
        <form className="flex flex-col gap-6 py-6" onSubmit={handleSubmit}>
          <TextInput
            label="Tên tiêu chí"
            currentValue={data.name}
            error={errors.name}
            name="name"
            setData={setData}
          />

          <TextInput
            label="Slug"
            currentValue={data.slug}
            error={errors.slug}
            name="slug"
            setData={setData}
          />
        </form>
      </SheetWrapper>
    </span>
  );
};

export default EditCriteriaInfo;
