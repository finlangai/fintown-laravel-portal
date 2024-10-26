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
import { FormEvent, ReactNode } from "react";
import { DeleteButton } from "./crud-button";

interface ConfirmDeleteProps {
  children?: ReactNode;
  title?: string;
  destroyUrl: string;
}

const ConfirmDelete = ({ children, title, destroyUrl }: ConfirmDeleteProps) => {
  const { delete: deleteMethod } = useForm();
  const deleteHandle = (e: FormEvent) => {
    e.preventDefault();
    deleteMethod(destroyUrl);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span>
          <DeleteButton />
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
