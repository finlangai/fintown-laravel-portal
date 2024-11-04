import { Tabs } from "@/Components/UI/tabs";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/Components/UI/dialog";
import { Switch } from "@/Components/UI/switch";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
const AddRole = ({ listRole, RoleName , staffId}: any) => {
   const { data, setData, put } = useForm({
      roles: Array.isArray(RoleName) ? RoleName : [] 
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault(); 
   
      put(`/staff/update-permissions/${staffId}`, {
         data: {
            roles: data.roles,
         },
         onSuccess: () => {
            // Xử lý khi cập nhật thành công (tuỳ chỉnh)
         },
         onError: () => {
            // Xử lý khi cập nhật thất bại (tuỳ chỉnh)
         },
      });
   };
   

   return (
      <>
         <Dialog>
            <DialogTrigger className="flex items-center justify-center w-7 h-7 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200">
            <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-file-plus-2"
               >
                  <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M3 15h6" />
                  <path d="M6 12v6" />
               </svg>
            </DialogTrigger>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Phân quyền cho nhân viên</DialogTitle>
                  <DialogDescription>
                     <Tabs defaultValue="account" className="w-full border border-gray-300 rounded-md mt-3">
                           <ul className="p-5">
                              {listRole.map((item: any, index: number) => {
                                 const isChecked = data.roles.includes(item.name);
                                 return (
                                    <li key={index} className="mt-3">
                                       <div className='flex justify-between'>
                                          <span>{item.name}</span>
                                          <span>
                                             <Switch 
                                                checked={isChecked} 
                                                onCheckedChange={(checked) => {
                                                   const updatedRoles = checked
                                                      ? [...data.roles, item.name]  
                                                      : data.roles.filter((role: any) => role !== item.name);
                                                   setData('roles', updatedRoles); 
                                                }} 
                                             />
                                          </span>
                                       </div>
                                    </li>
                                 );
                              })}
                           </ul>
                           <button type="submit" className="mt-4 bg-custom-button-success text-white rounded-md px-4 py-2 ml-3" onClick={handleSubmit}>
                              Lưu Phân quyền
                           </button>
                     </Tabs>
                  </DialogDescription>
               </DialogHeader>
            </DialogContent>
         </Dialog>
      </>
   );
};
export default AddRole;