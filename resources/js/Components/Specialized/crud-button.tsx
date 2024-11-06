import { cn } from "@/Lib/utils";
import { BadgePlus, FilePlus2, PencilLine, Save, Trash2 } from "lucide-react";
import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asDiv?: boolean;
  children?: ReactNode;
  className?: string;
}

const ButtonComponent = ({
  asDiv = false,
  children,
  className,
  ...props
}: ButtonProps & HTMLAttributes<HTMLDivElement>) => {
  const Component = asDiv ? "div" : "button";
  return (
    <Component
      className={cn(
        "flex items-center gap-1 px-3 py-2 rounded-md font-medium text-white",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

const buttonStyles =
  "flex items-center gap-1 px-3 py-2 rounded-md font-medium text-white";

export const AddButton = ({
  asDiv,
  children = "Thêm",
  className,
  ...props
}: ButtonProps & HTMLAttributes<HTMLDivElement>) => (
  <ButtonComponent
    asDiv={asDiv}
    className={cn("bg-green-400", buttonStyles, className)}
    {...props}
  >
    <BadgePlus className="size-5" />
    {children}
  </ButtonComponent>
);

export const StoreButton = ({
  asDiv,
  children = "Xác nhận",
  className,
  ...props
}: ButtonProps & HTMLAttributes<HTMLDivElement>) => (
  <ButtonComponent
    asDiv={asDiv}
    className={cn("bg-green-500", buttonStyles, className)}
    {...props}
  >
    <FilePlus2 className="size-5" />
    {children}
  </ButtonComponent>
);

export const EditButton = ({
  asDiv,
  children = "Chỉnh sửa",
  className,
  ...props
}: ButtonProps & HTMLAttributes<HTMLDivElement>) => (
  <ButtonComponent
    asDiv={asDiv}
    className={cn(
      "bg-blue-400 shadow-sm font-bold text-sm",
      buttonStyles,
      className,
    )}
    {...props}
  >
    <PencilLine className="size-4" />
    {children}
  </ButtonComponent>
);

export const SaveButton = ({
  asDiv,
  children = "Lưu",
  className,
  ...props
}: ButtonProps & HTMLAttributes<HTMLDivElement>) => (
  <ButtonComponent
    asDiv={asDiv}
    className={cn(
      "bg-purple-400 shadow-sm font-bold text-sm",
      buttonStyles,
      className,
    )}
    {...props}
  >
    <Save className="size-4" />
    {children}
  </ButtonComponent>
);

export const DeleteButton = ({
  asDiv,
  children = "Xóa",
  className,
  ...props
}: ButtonProps & HTMLAttributes<HTMLDivElement>) => (
  <ButtonComponent
    asDiv={asDiv}
    className={cn(
      "bg-red-400 shadow-sm font-bold text-sm",
      buttonStyles,
      className,
    )}
    {...props}
  >
    <Trash2 className="size-4" />
    {children}
  </ButtonComponent>
);
