import { AddButton, StoreButton } from "@/Components/Specialized/crud-button";
import DialogWrapper, {
  DialogWrapperHandler,
} from "@/Components/Specialized/dialog-wrapper";
import TextInput from "@/Components/Specialized/form/TextInput";
import { Label } from "@/Components/UI/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/UI/select";
import { useUserPage } from "@/Contexts/UserPageContext";
import { capitalizeFirstChar } from "@/Lib/utils";
import { useForm } from "@inertiajs/react";
import { FC, FormEvent, useEffect, useRef } from "react";

type CreateUserProps = {};
const CreateUser: FC<CreateUserProps> = ({}) => {
  const { userRoles } = useUserPage();
  const editDialogRef = useRef<DialogWrapperHandler>(null);
  const { post, data, setData, errors, wasSuccessful, isDirty } = useForm({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    role: "basic",
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
        {/* === ROLE */}
        <div>
          <Label className="mb-1 text-slate-700" htmlFor={`textinput_${name}`}>
            Loại khách hàng
          </Label>
          <Select
            value={data.role}
            onValueChange={(roleName: string) => setData("role", roleName)}
          >
            <SelectTrigger className="shadow-sm !ring-0 h-11">
              <SelectValue placeholder="Loại khách hàng" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {userRoles
                  .filter((item) => ["basic", "partner"].includes(item.name))
                  .map((role, index) => (
                    <SelectItem value={String(role.name)} key={index}>
                      {capitalizeFirstChar(role.name)}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* === PASSWORD */}
        <TextInput
          type="password"
          label={"Mật khẩu"}
          currentValue={data.password}
          error={errors.password}
          name={"password"}
          setData={setData}
          autoComplete="off"
        />
        {/* === CONFIRM PASSWORD */}
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
