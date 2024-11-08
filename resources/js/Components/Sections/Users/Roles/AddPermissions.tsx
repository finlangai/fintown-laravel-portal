import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/Components/UI/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/UI/popover";

type AddPermissionsProps = {
  trigger: React.ReactNode;
  currentPermissions: string[];
  permissions: Permission[];
  setData: (key: string, value: any) => void;
};
export const AddPermissions: React.FC<AddPermissionsProps> = ({
  trigger,
  currentPermissions,
  permissions,
  setData,
}) => {
  const [open, setOpen] = React.useState(false);

  const appendPermission = (name: string): void => {
    const newPermissions = [...currentPermissions];
    newPermissions.push(name);
    setData("permissions", newPermissions);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="p-0" side="right" align="start">
        <Command>
          <CommandInput placeholder="Tìm kiếm quyền hạn..." />
          <CommandList>
            <CommandEmpty>Không có kết quả.</CommandEmpty>
            <CommandGroup>
              {permissions.map((permission) => (
                <CommandItem
                  key={permission.id}
                  value={permission.name}
                  onSelect={(value: any) => {
                    appendPermission(value);
                    setOpen(false);
                  }}
                >
                  {permission.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
