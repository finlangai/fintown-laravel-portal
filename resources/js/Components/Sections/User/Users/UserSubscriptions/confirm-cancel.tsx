import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/UI/alert-dialog";
import { ReactNode, useState } from "react";

interface ConfirmCancelProps {
  children?: ReactNode;
  title?: ReactNode;
  actionHandle: Function;
  noPropogation?: boolean;
}

const ConfirmCancel = ({
  children,
  title,
  actionHandle,
  noPropogation = false,
}: ConfirmCancelProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const confirmationHandle = () => actionHandle();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        asChild
        onClick={(e) => (noPropogation ? e.stopPropagation() : null)}
      >
        <span
          onClick={() => {
            setOpen(true);
          }}
          className="bg-red-400 px-3 py-2 rounded-md w-fit font-medium text-white text-xs cursor-pointer"
        >
          Quay lại
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent
        onClick={(e) => (noPropogation ? e.stopPropagation() : null)}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? "Bạn chắc chắn chứ?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {children ??
              "Hành động này sẽ không thể hoàn tác và có khả năng vĩnh viễn không khôi phục được."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction
            onClick={confirmationHandle}
            className="bg-red-400"
          >
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmCancel;
