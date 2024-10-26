import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/Components/UI/dialog";
import { Clipboard, TimerReset } from "lucide-react";
import { useForm, usePage } from "@inertiajs/react"; // Import useForm nếu cần thiết
import { useToast } from "@/Hooks/use-toast";
import { Toaster } from "@/Components/UI/toaster";
import { useState } from "react";

const ResetPass = ({ staffId,  new_password , id_nhanvienResetSuccess} : { staffId: string , new_password : string , id_nhanvienResetSuccess:string}) => {
   const { post, processing } = useForm();
   const { toast } = useToast();

  
   const handleResetPassword = () => {
       post(`/staff/reset-password/${staffId}`, {
           onSuccess: () => {
               console.log('Password đã được reset thành công.');
               toast({
                  title: "Thành công!",
                  description: "Reset password success!",
                });
           },
           onError: (errors) => {
               console.error('Có lỗi xảy ra khi reset password.', errors);
               toast({
                  title: "Thành công!",
                  description: "Reset password false !!!",
                });
               
           },
       });
   };

   return (
      <Dialog>
      <DialogTrigger>
          <TimerReset />
      </DialogTrigger>
      <DialogContent className="flex justify-center items-center">
          <DialogHeader>
              <DialogTitle className="text-center">
                  {new_password && id_nhanvienResetSuccess == staffId ? (
                      <span>hãy lưu trữ thông tin password nhân viên</span>
                  ) : (
                     <span>bạn có chắc chắn</span>
                  )}
              </DialogTitle>
              <DialogDescription className="flex flex-col justify-center items-center text-center">
                  {new_password && id_nhanvienResetSuccess == staffId ? (
                      <p>
                          Thông tin Password của nhân viên <br /> <strong>{new_password}</strong>
                        
                      </p>
                  ) : (
                      <p>password của nhân viên sẽ được reset !!!</p>
                  )}


                  <button
                      onClick={handleResetPassword}
                      className={`mt-4 bg-custom-button-warning rounded-sm w-32 text-white ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={processing}
                  >
                      {processing ? "Đang reset..." : "Reset"}
                  </button>
              </DialogDescription>
          </DialogHeader>
      </DialogContent>
  </Dialog>
   );
}

export default ResetPass;
