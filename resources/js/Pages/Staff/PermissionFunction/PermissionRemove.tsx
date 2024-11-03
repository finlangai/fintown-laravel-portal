import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/Components/UI/dialog";
import { useToast } from "@/Hooks/use-toast";
import { useForm } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import { Toaster } from "@/Components/UI/toaster";
import DialogWrapper from "@/Components/Specialized/dialog-wrapper";
const PermissionRemove = ({ PermissionID } : { PermissionID : number }) => {
   const { delete: destroy, processing } = useForm();
   const { toast } = useToast();
   const deleteItem = (id : number) => {
       destroy(`/Permission/Remove/${id}`, { 
         onSuccess: () => {
           toast({
            title: "Thành công",
            description: "Đã xóa thành công quyền(permission)",
          });
         },
         onError: () => {
            toast({
               title: "Thất bại",
               description: "ID vai trò Không tồn tại",
             });
         },
       });
   };

   return (
      <Dialog>
         <DialogTrigger>
            <button className="text-red-500 hover:text-red-700 transition duration-200" title="Xóa">
               <Trash2 className="inline h-4 w-4" />
            </button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Bạn chắc chắn chứ</DialogTitle>
               <DialogDescription className="flex flex-col">
                  <p className="my-3">
                     Khi bạn xác nhận, dữ liệu Quyền này sẽ bị xóa. Các role đã được phân tại Quyền này sẽ cần phải Thêm lại!
                  </p>
                  <div className="flex justify-center">
                     <button
                        type="button"
                        onClick={() => deleteItem(PermissionID)}
                        className="bg-custom-button-error rounded-md text-text-head-main w-1/3 items-center p-1"
                        disabled={processing} 
                     >
                        {processing ? "Đang xóa..." : "Xác nhận"}
                     </button>
                  </div>
               </DialogDescription>
            </DialogHeader>
         </DialogContent>
      </Dialog>
   );
};

export default PermissionRemove;
