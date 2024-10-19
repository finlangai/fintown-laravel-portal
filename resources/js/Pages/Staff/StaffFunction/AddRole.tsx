import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/UI/tabs";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/Components/UI/dialog";
import { Switch } from "@/Components/UI/switch";
import { useForm, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

const AddRole = ({ permissionTranslations, nameStaff, StaffID }: any) => {
   // Tất cả quyền đang có
   const { permissionsList }: any = usePage().props;
   const { staffList }: any = usePage().props;
   const Staff = staffList.find((staff: any) => staff.id === StaffID);

   const [userPermissions, setUserPermissions] = useState<string[]>([]);

   const { data, setData, put, processing, errors } = useForm<any>({
      permissions: [],
   });

   useEffect(() => {
      if (Staff) {
         setUserPermissions(Staff.permissions);
         setData('permissions', Staff.permissions);
      }
   }, [Staff]);

   const handlePermissionChange = (permission: string) => {
      setUserPermissions((prev) => {
          const newPermissions = prev.includes(permission)
              ? prev.filter((p) => p !== permission)
              : [...prev, permission];
          
          setData('permissions', newPermissions);
          return newPermissions;
      });
  };
   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      put(`/staff/update-permissions/${StaffID}`);
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
                  <DialogTitle>Phân quyền cho nhân viên {nameStaff}</DialogTitle>
                  <DialogDescription>
                     <Tabs defaultValue="account" className="w-full border border-gray-300 rounded-md mt-3">
                     <form onSubmit={handleSubmit} className="pb-5">
                        <TabsList className="flex bg-gray-100 border-b border-gray-300">
                           <TabsTrigger
                              value="account"
                              className="flex-1 py-2 text-center cursor-pointer transition-colors duration-200 hover:bg-white active:bg-white"
                           >
                             Quyền người dùng
                           </TabsTrigger>
                           <TabsTrigger
                              value="password"
                              className="flex-1 py-2 text-center cursor-pointer transition-colors duration-200 hover:bg-white active:bg-white"
                           >
                              Thông tin cá nhân
                           </TabsTrigger>
                        </TabsList>
                           
                        <TabsContent value="account" className="p-4 bg-white border border-t-0 border-gray-300 max-h-[500px] overflow-y-auto">
                             <ul>
                             {permissionsList.map((item: any) => (
                                 <li key={item.id} >
                                    <div className="flex items-center justify-between py-2">
                                       <span>{permissionTranslations[item.name] || item.name}</span>
                                       <Switch
                                          checked={userPermissions.includes(item.name)}
                                          onCheckedChange={(checked) => {
                                             handlePermissionChange(item.name);
                                          }}
                                       />
                                    </div>
                                 </li>
                              ))}
                             </ul>
                             <button type="submit" disabled={processing} className="mt-4 bg-custom-button-success text-white rounded-md px-4 py-2 ml-3">
                                 Lưu Phân quyền
                             </button>
                        </TabsContent>
                        <TabsContent value="password" className="p-4 bg-white border border-t-0 border-gray-300 max-h-[500px] min-h-[500px] overflow-y-auto">
                           <div className="max-w-sm bg-gray-900 text-center rounded-lg shadow-lg mx-auto">
                              <div
                                 className="relative h-48 bg-cover bg-center rounded-t-lg"
                                 style={{
                                 backgroundImage:
                                    'url("https://tse4.mm.bing.net/th?id=OIP.itUJGexw3l8bJoXo4qGwZgHaE7&pid=Api&P=0&h=180")',
                                 }}
                              >
                                 <img
                                 src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/397974475_874973580805442_8304577279723242519_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHZ28aZ0EsKA8ebVspJRlUtdf1LEcL3VnV1_UsRwvdWdYt9BtBiQp9wD7VBbCdLfWv2OIkh_NwdTWvIqmFgMgJI&_nc_ohc=g5OeDpNxZS8Q7kNvgF_U8Qu&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=A0q5oRUTG9EKItRkAudhpnl&oh=00_AYARqHceMhIFj65juq9n5hd8_SWJ-V9shqakMTD6lwPFbA&oe=67181CFE"
                                 className="absolute w-28 h-28 rounded-full border-4 border-gray-900 bg-gray-900 p-1 bottom-0 left-5 transform translate-y-1/2"
                                 />
                              </div>
                              <h3 className="mt-12 text-white text-lg font-bold">{nameStaff || "họ tên"}</h3>
                              <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                                Hacker deverlopment
                              </p>
                              <div className="mt-6 flex justify-center space-x-4">
                                 <button className="px-5 py-2 bg-blue-400 text-gray-900 font-bold rounded-md transition duration-200 hover:bg-blue-500">
                                 Message
                                 </button>
                                 <button className="px-5 py-2 bg-transparent text-blue-400 font-bold border border-blue-400 rounded-md transition duration-200 hover:bg-blue-400 hover:text-gray-900">
                                 Following
                                 </button>
                              </div>
                              <div className="mt-6 flex justify-center space-x-4 text-xl text-gray-400">
                                 <i className="fab fa-linkedin hover:text-blue-400 transition duration-200 cursor-pointer" />
                                 <i className="fab fa-github hover:text-blue-400 transition duration-200 cursor-pointer" />
                                 <i className="fab fa-youtube hover:text-blue-400 transition duration-200 cursor-pointer" />
                                 <i className="fab fa-twitter hover:text-blue-400 transition duration-200 cursor-pointer" />
                              </div>
                           </div>
                        </TabsContent>

                     </form>
                     </Tabs>
                  </DialogDescription>
               </DialogHeader>
            </DialogContent>
         </Dialog>
      </>
   );
};

export default AddRole;
