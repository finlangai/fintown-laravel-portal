import TextInput from "@/Components/Specialized/form/TextInput";

const CriteriaFormInner = ({
  data,
  setData,
  errors,
}: {
  data: any;
  setData: (name: string, value: any) => void;
  errors: { [key: string]: any };
}) => {
  return (
    <>
      {/* NAME */}
      <TextInput
        name="name"
        label="Tên"
        currentValue={data.name}
        setData={setData}
        error={errors.name}
      />

      {/* SLUG */}
      <TextInput
        name="slug"
        label="Slug"
        currentValue={data.slug}
        setData={setData}
        error={errors.slug}
      />
    </>
  );
};

export default CriteriaFormInner;
