import { cn } from "@/Lib/utils";
import { BadgePlus, PencilLine, Save, Trash2 } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
} & classNameInterface;

export const AddButton = ({
  children = "Thêm",
  className,
  ...props
}: ButtonProps) => (
  <button
    className={cn(
      "flex items-center gap-1 bg-green-400 px-3 py-2 rounded-md font-medium text-white",
      className,
    )}
    {...props}
  >
    <BadgePlus className="size-5" />
    {children}
  </button>
);

export const EditButton = ({
  children = "Chỉnh sửa",
  className,
  ...props
}: ButtonProps) => (
  <button
    className={cn(
      "flex items-center gap-1 bg-blue-400 shadow-sm px-3 py-2 rounded-md font-bold text-sm text-white",
      className,
    )}
    {...props}
  >
    <PencilLine className="size-4" />
    {children}
  </button>
);

export const SaveButton = ({
  children = "Lưu",
  className,
  ...props
}: ButtonProps) => (
  <button
    className={cn(
      "flex items-center gap-1 bg-sky-400 shadow-sm px-3 py-2 rounded-md font-bold text-sm text-white",
      className,
    )}
    {...props}
  >
    <Save className="size-4" />
    {children}
  </button>
);

export const DeleteButton = ({
  children = "Xóa",
  className,
  ...props
}: ButtonProps) => (
  <button
    className={cn(
      "flex items-center gap-1 bg-red-400 shadow-sm px-3 py-2 rounded-md font-bold text-sm text-white",
      className,
    )}
    {...props}
  >
    <Trash2 className="size-4" />
    {children}
  </button>
);
