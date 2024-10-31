import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/Components/UI/drawer";
import { cn } from "@/Lib/utils";
import {
  FC,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from "react";

type DrawerWrapperProps = {
  trigger: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export const DrawerCloseButton: FC<
  { children?: ReactNode } & classNameInterface
> = ({ children, className }) => {
  return (
    <DrawerClose
      className={cn(
        "mx-auto w-fit border-2 px-12 py-2 rounded-md font-bold text-slate-600 text-sm",
        className,
      )}
    >
      {children ?? "Đóng"}
    </DrawerClose>
  );
};

export type DrawerWrapperHandler = {
  open: () => void;
  close: () => void;
};

const DrawerWrapper = forwardRef<DrawerWrapperHandler, DrawerWrapperProps>(
  ({ trigger, title, description, footer, children }, ref) => {
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
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <div>{trigger}</div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          {children}
          <DrawerFooter>{footer ? footer : <DrawerCloseButton />}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
);

export default DrawerWrapper;
