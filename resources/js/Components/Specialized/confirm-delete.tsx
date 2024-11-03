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
import { useForm } from "@inertiajs/react";
import { FormEvent, ReactNode, useState } from "react";
import { DeleteButton } from "./crud-button";

interface ConfirmDeleteProps {
  children?: ReactNode;
  trigger?: ReactNode;
  title?: string;
  destroyUrl: string;
}

const ConfirmDelete = ({
  children,
  trigger,
  title,
  destroyUrl,
}: ConfirmDeleteProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { delete: deleteMethod } = useForm();

  const deleteHandle = (e: FormEvent) => {
    e.preventDefault();
    deleteMethod(destroyUrl, { preserveScroll: true, preserveState: true });
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <span>
          {trigger ? (
            trigger
          ) : (
            <DeleteButton
              onClick={() => {
                setOpen(true);
              }}
              type="button"
            />
          )}
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? "Bạn chắc chắn chứ?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {children ??
              "Hành động này sẽ không thể hoàn tác và có khả năng vĩnh viễn không khôi phục được."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction onClick={deleteHandle} className="bg-red-400">
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDelete;
