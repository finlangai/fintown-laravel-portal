import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/UI/dialog";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";

type DialogWrapperProps = {
  trigger: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  title: string;
  description?: string;
} & classNameInterface;

export type DialogWrapperHandler = {
  toggle: () => void;
  open: () => void;
  close: () => void;
};
const DialogWrapper = forwardRef<DialogWrapperHandler, DialogWrapperProps>(
  ({ title, trigger, children, footer, description, className }, ref) => {
    const [open, setOpen] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      toggle: () => {
        setOpen(!open);
      },
      open: () => {
        setOpen(true);
      },
      close: () => {
        setOpen(false);
      },
    }));

    // useEffect(() => {
    //   console.log("the state of the fucking dialog: ", open);
    // }, [open]);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div>{trigger}</div>
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
