import { EditButton, SaveButton } from "@/Components/Specialized/crud-button";
import DialogWrapper, {
  DialogWrapperHandler,
} from "@/Components/Specialized/dialog-wrapper";
import TextInput from "@/Components/Specialized/form/TextInput";
import { useUserRolesPage } from "@/Contexts/UserRolesPageContext";
import { cn } from "@/Lib/utils";
import { useForm } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { FC, FormEvent, useEffect, useRef } from "react";
import { AddPermissions } from "./AddPermissions";
import PermissionTag from "./PermissionTag";

type EditRoleProps = {
  role: Role & { permissions: Permission[] };
};
export const EditRole: FC<EditRoleProps> = ({ role }) => {
  const createDialogRef = useRef<DialogWrapperHandler>(null);
  const { data, setData, errors, post, wasSuccessful, isDirty } = useForm({
    name: role.name,
    permissions: role.permissions.map(({ name }) => name),
  });

  const { permissions } = useUserRolesPage();

  const removePermission = (index: number): void => {
    data.permissions.splice(index, 1);
    setData("permissions", [...data.permissions]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post(route("users.roles.update", role.id));
  };

  useEffect(() => {
    if (wasSuccessful) createDialogRef.current?.close();
  }, [wasSuccessful]);

  return (
    <DialogWrapper
      ref={createDialogRef}
      title="Thêm vai trò"
      trigger={<EditButton className="text-xs" />}
      footer={
        <SaveButton
          children="Lưu"
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
          </div>
          {/* END - PERMISSION TAGS CONTAINER */}
        </div>
      </form>
    </DialogWrapper>
  );
};
