import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/UI/dialog";
import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";

type DialogWrapperProps = {
  trigger: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  title: string;
  description?: string;
} & classNameInterface;

export type DialogWrapperHandler = {
  toggle: () => void;
};
const DialogWrapper = forwardRef<DialogWrapperHandler, DialogWrapperProps>(
  ({ title, trigger, children, footer, description, className }, ref) => {
    const triggerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      toggle: () => {
        if (triggerRef.current) triggerRef.current.click();
      },
    }));

    return (
      <Dialog>
        <DialogTrigger asChild>
          <div ref={triggerRef}>{trigger}</div>
        </DialogTrigger>
        <DialogContent className={className}>
          <DialogHeader>
            <DialogTitle className="text-slate-700 text-xl">
              {title}
            </DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter>
            <div>{footer}</div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

export default DialogWrapper;
