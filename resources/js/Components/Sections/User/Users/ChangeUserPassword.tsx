import { SaveButton } from "@/Components/Specialized/crud-button";
import DialogWrapper, {
  DialogWrapperHandler,
} from "@/Components/Specialized/dialog-wrapper";
import TextInput from "@/Components/Specialized/form/TextInput";
import { useForm } from "@inertiajs/react";
import { FC, FormEvent, useEffect, useRef } from "react";

type ChangeUserPasswordProps = {
  user: User;
};
const ChangeUserPassword: FC<ChangeUserPasswordProps> = ({ user }) => {
  const editDialogRef = useRef<DialogWrapperHandler>(null);
  const { patch, data, setData, errors, wasSuccessful, isDirty, processing } =
    useForm({
      password: "",
      confirmPassword: "",
    });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    patch(route("users.update.password", user.id));
  };

  useEffect(() => {
    if (wasSuccessful) editDialogRef.current?.close();
  }, [wasSuccessful]);

  return (
    <DialogWrapper
      ref={editDialogRef}
      title={
        <div className="text-lg">
          Thay đổi mật khẩu cho khách hàng <br></br>
          <span className="font-bold text-xl underline underline-offset-2">
            {user.fullname}
          </span>{" "}
          với email{" "}
          <span className="font-bold text-xl underline underline-offset-2">
            {user.email}
          </span>
        </div>
      }
      noPropogation
      trigger={
        <span
          className="cursor-pointer"
          onClick={(e) => {
            editDialogRef.current?.toggle();
            e.stopPropagation();
          }}
        >
          Đổi mật khẩu
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
      <form
        className="flex flex-col gap-4 p-3"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        {/* === FULLNAME */}
        <TextInput
          type="password"
          label={"Mật khẩu mới"}
          currentValue={data.password}
          error={errors.password}
          name={"password"}
          setData={setData}
          autoComplete="off"
        />
        {/* === EMAIL */}
        <TextInput
          type="password"
          label={"Xác nhận mật khẩu mới"}
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

export default ChangeUserPassword;
