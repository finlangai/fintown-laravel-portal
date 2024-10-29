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
import { ReactNode } from "react";

interface SheetWrapperProps {
  trigger: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}
export function SheetWrapper({
  trigger,
  title,
  children,
  description,
  footer,
}: SheetWrapperProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
        <SheetFooter>
          <SheetClose asChild>{footer}</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
