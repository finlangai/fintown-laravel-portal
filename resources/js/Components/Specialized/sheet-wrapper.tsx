import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/UI/sheet";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";

interface SheetWrapperProps {
  trigger: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export type SheetWrapperHandler = {
  open: () => void;
  close: () => void;
};

export const SheetWrapper = forwardRef<SheetWrapperHandler, SheetWrapperProps>(
  ({ trigger, title, children, description, footer }, ref) => {
    const [open, setOpen] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      open: () => {
        setOpen(true);
      },
      close: () => {
        setOpen(false);
      },
    }));

    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div>{trigger}</div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          {children}
          <SheetFooter>
            <SheetClose asChild>
              <div>{footer}</div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
);
