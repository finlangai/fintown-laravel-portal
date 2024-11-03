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
const RemoveRole = ({ RoleID } : { RoleID : number }) => {
   const { delete: destroy, processing } = useForm();
   const { toast } = useToast();
   const deleteItem = (id : number) => {
       destroy(`/roles/Remove/${id}`, { 
         onSuccess: () => {
           toast({
            title: "Thành công",
            description: "Đã xóa thành công vai trò",
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
            <Toaster/>
            <button className="flex items-center justify-center w-7 h-7 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200" title="Xóa">
               <Trash2 className="inline h-4 w-4" />
            </button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Bạn chắc chắn chứ</DialogTitle>
               <DialogDescription className="flex flex-col">
                  <p className="my-3">
                     Khi bạn xác nhận, dữ liệu role này sẽ bị xóa. Các nhân viên đã được phân tại role này sẽ cần phải phân lại!
                  </p>
                  <div className="flex justify-center">
                     <button
                        type="button"
                        onClick={() => deleteItem(RoleID)}
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

export default RemoveRole;
