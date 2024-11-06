import { SaveButton } from "@/Components/Specialized/crud-button";
import DialogWrapper, {
  DialogWrapperHandler,
} from "@/Components/Specialized/dialog-wrapper";
import TextInput from "@/Components/Specialized/form/TextInput";
import { useForm } from "@inertiajs/react";
import { FC, FormEvent, useEffect, useRef } from "react";

type EditUserProps = {
  user: User;
};
const EditUser: FC<EditUserProps> = ({ user }) => {
  const editDialogRef = useRef<DialogWrapperHandler>(null);
  const { patch, data, setData, errors, wasSuccessful, isDirty } = useForm({
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
    address: user.address ?? "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    patch(route("users.update", user.id));
  };

  useEffect(() => {
    if (wasSuccessful) editDialogRef.current?.close();
  }, [wasSuccessful]);

  return (
    <DialogWrapper
      ref={editDialogRef}
      title="Chỉnh sửa thông tin khách hàng"
      noPropogation
      trigger={
        <span
          className="cursor-pointer"
          onClick={(e) => {
            editDialogRef.current?.toggle();
            e.stopPropagation();
          }}
        >
          Chỉnh sửa
        </span>
      }
      footer={
        <SaveButton
          disabled={!isDirty}
          className={!isDirty ? "bg-neutral-400" : ""}
          onClick={handleSubmit}
          onKeyDown={(e) => (e.key == "Enter" ? handleSubmit(e) : null)}
        />
      }
    >
      <form className="flex flex-col gap-4 p-3" onSubmit={handleSubmit}>
        {/* === FULLNAME */}
        <TextInput
          label={"Họ tên"}
          currentValue={data.fullname}
          error={errors.fullname}
          name={"fullname"}
          setData={setData}
        />
        {/* === EMAIL */}
        <TextInput
          label={"Email"}
          currentValue={data.email}
          error={errors.email}
          name={"email"}
          setData={setData}
        />
        {/* === PHONE */}
        <TextInput
          label={"Số điện thoại"}
          currentValue={data.phone}
          error={errors.phone}
          name={"phone"}
          setData={setData}
        />
        {/* === ADDRESS */}
        <TextInput
          label={"Địa chỉ"}
          currentValue={data.address}
          error={errors.address}
          name={"address"}
          setData={setData}
        />
      </form>
    </DialogWrapper>
  );
};

export default EditUser;
