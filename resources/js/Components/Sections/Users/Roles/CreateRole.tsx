import { AddButton } from "@/Components/Specialized/crud-button";
import DialogWrapper, {
  DialogWrapperHandler,
} from "@/Components/Specialized/dialog-wrapper";
import TextInput from "@/Components/Specialized/form/TextInput";
import { useUserRolesPage } from "@/Contexts/UserRolesPageContext";
import { cn } from "@/Lib/utils";
import { useForm } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { FormEvent, useEffect, useRef } from "react";
import { AddPermissions } from "./AddPermissions";
import PermissionTag from "./PermissionTag";

export const CreateRole = () => {
  const createDialogRef = useRef<DialogWrapperHandler>(null);
  const { data, setData, errors, post, wasSuccessful, isDirty } = useForm({
    name: "",
    permissions: [],
  });

  const { permissions } = useUserRolesPage();

  const removePermission = (index: number): void => {
    data.permissions.splice(index, 1);
    setData("permissions", [...data.permissions]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post(route("users.roles.store"));
  };

  useEffect(() => {
    if (wasSuccessful) createDialogRef.current?.close();
  }, [wasSuccessful]);

  return (
    <DialogWrapper
      ref={createDialogRef}
      title="Thêm vai trò"
      trigger={<AddButton />}
      footer={
        <AddButton
          children="Xác nhận thêm"
          disabled={!isDirty}
          className={cn(!isDirty ? "bg-neutral-400" : "")}
          onClick={handleSubmit}
        />
      }
    >
      <form className="flex flex-col gap-4 p-3" onSubmit={handleSubmit}>
        <TextInput
          currentValue={data.name}
          error={errors.name}
          label="Tên vai trò"
          name="name"
          setData={setData}
          placehodler="Thiên sứ, Tông đồ, ..."
        />

        <div className="flex flex-col gap-3 mt-3">
          <div className="flex items-center gap-3">
            <p className="font-medium text-slate-700 text-sm">Quyền hạn</p>
            <AddPermissions
              currentPermissions={data.permissions}
              permissions={permissions.filter(({ name: currPermissionName }) =>
                data.permissions.every(
                  (existedPermissionName) =>
                    currPermissionName != existedPermissionName,
                ),
              )}
              setData={setData}
              trigger={
                <span className="flex items-center gap-2 border-slate-600 px-2 py-1 border border-opacity-50 rounded-lg font-bold text-slate-600 text-xs cursor-pointer">
                  <Plus className="size-3" /> Thêm
                </span>
              }
            />
          </div>

          {/* START - PERMISSION TAGS CONTAINER */}
          <div className="flex flex-wrap gap-2 pt-3">
            {!data.permissions.length ? (
              <div className="flex-1 font-medium text-red-400 text-xs">
                *Vui lòng chọn ít nhất 1 quyền hạn
              </div>
            ) : (
              <>
                {data.permissions.map((permissionName, index) => (
                  <PermissionTag
                    key={index}
                    permissionName={permissionName}
                    removeHandler={() => {
                      removePermission(index);
                    }}
                  />
                ))}
              </>
            )}
          </div>
          {/* END - PERMISSION TAGS CONTAINER */}
        </div>
      </form>
    </DialogWrapper>
  );
};
