import { AddButton, StoreButton } from "@/Components/Specialized/crud-button";
import DialogWrapper, {
  DialogWrapperHandler,
} from "@/Components/Specialized/dialog-wrapper";
import TextInput from "@/Components/Specialized/form/TextInput";
import { useForm } from "@inertiajs/react";
import { FC, FormEvent, useEffect, useRef } from "react";

type CreateUserProps = {};
const CreateUser: FC<CreateUserProps> = ({}) => {
  const editDialogRef = useRef<DialogWrapperHandler>(null);
  const { post, data, setData, errors, wasSuccessful, isDirty } = useForm({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post(route("users.store"));
  };

  useEffect(() => {
    if (wasSuccessful) editDialogRef.current?.close();
  }, [wasSuccessful]);

  return (
    <DialogWrapper
      ref={editDialogRef}
      title="Thêm khách hàng mới"
      trigger={<AddButton className="shadow-md" />}
      footer={
        <StoreButton
          disabled={!isDirty}
          className={!isDirty ? "bg-neutral-400" : ""}
          onClick={handleSubmit}
          onKeyDown={(e) => (e.key == "Enter" ? handleSubmit(e) : null)}
        />
      }
    >
      <form
        className="flex flex-col gap-4 p-3"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        {/* === FULLNAME */}
        <TextInput
          label={"Họ tên"}
          currentValue={data.fullname}
          error={errors.fullname}
          name={"fullname"}
          setData={setData}
          autoComplete="off"
        />
        {/* === EMAIL */}
        <TextInput
          label={"Email"}
          currentValue={data.email}
          error={errors.email}
          name={"email"}
          setData={setData}
          autoComplete="off"
          type="email"
        />
        {/* === PHONE */}
        <TextInput
          label={"Số điện thoại"}
          currentValue={data.phone}
          error={errors.phone}
          name={"phone"}
          setData={setData}
          autoComplete="off"
          maxLength={11}
        />
        {/* === ADDRESS */}
        <TextInput
          label={"Địa chỉ"}
          currentValue={data.address}
          error={errors.address}
          name={"address"}
          setData={setData}
          autoComplete="off"
        />
        <TextInput
          type="password"
          label={"Mật khẩu"}
          currentValue={data.password}
          error={errors.password}
          name={"password"}
          setData={setData}
          autoComplete="off"
        />
        {/* === EMAIL */}
        <TextInput
          type="password"
          label={"Xác nhận mật khẩu"}
          currentValue={data.confirmPassword}
          error={errors.confirmPassword}
          name={"confirmPassword"}
          setData={setData}
          autoComplete="off"
        />
      </form>
    </DialogWrapper>
  );
};

export default CreateUser;
