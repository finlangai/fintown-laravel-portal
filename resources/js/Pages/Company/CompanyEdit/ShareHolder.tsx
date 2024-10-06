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
 import { Button } from "@/Components/UI/Button";
 import { Input } from "@/Components/UI/input";
 import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
 } from "@/Components/UI/select";
 import { useForm } from "@inertiajs/react";
 import { useState } from "react";
import { toast, Toaster } from "sonner";
 
 const ShareHolder: React.FC<ShareHolderProps> = ({ holders }) => {
   const [visibleCount, setVisibleCount] = useState(10);
 
   const showMore = () => {
     setVisibleCount(holders.length);
   };
 
   const { data, setData, put, delete: deleteData, processing, errors } = useForm({
     id: '',
     symbol: '',
     name: '',
     position: '',
     shares: '',
     ownership: '',
     is_organization: false,
     is_foreigner: false,
     is_founder: false,
   });
 
   const handleEdit = (item: any) => {
     setData({
       id: item.id,
       symbol: item.symbol,
       name: item.name,
       position: item.position || "",
       shares: item.shares.toString(),
       ownership: item.ownership,
       is_organization: item.is_organization,
       is_foreigner: item.is_foreigner,
       is_founder: item.is_founder,
     });
   };
   const luuShareHolders = (e: React.FormEvent) => {
      // e.preventDefault();
      put(`/holders/update/${data.id}`, {
          onSuccess: () => {
              console.log('Đã truyền dữ liệu đi');
              toast('Cập nhập thành công', {
               description: "Kéo xuống để tắt thông báo",
             });
          },
          onError: (error) => {
              console.error("Đã xảy ra lỗi khi gửi dữ liệu.", error);
          },
      });
  };
  const removeHolders = (id : string) =>{
         deleteData(`/holders/delete/${id}`, {
            onSuccess: () => {
               toast('Xóa thành công Holders', {
                  description: "Kéo xuống để tắt thông báo",
                });
            },
            onError: () => {
               console.error('Đã xảy ra lỗi khi xóa.');
            },
      });
  }
  
  
   return (
     <>
      <Toaster />
       <div className="flex mt-10 justify-between">
         <div className="w-[488px] h-[58px] flex-col justify-center items-start gap-2.5 inline-flex">
           <div className="text-white text-base font-bold font-['Inter']">Danh sách cổ đông</div>
           <div className="w-[488px] text-white text-sm font-normal font-['Inter']">Cập nhật thông tin cổ đông lớn của công ty tại đây</div>
         </div>
         <div className="w-[202px] h-10 justify-center items-start gap-3 inline-flex">
                            <button type="button" >
                                
                            </button>
                            <AlertDialog>
                                 <AlertDialogTrigger asChild>
                                 <Button variant="outline" className="w-[200px] self-stretch bg-custom-button-success rounded-lg border border-[#8a8a8a] justify-center items-center inline-flex">
                                 <div className="text-white text-sm font-semibold font-['Inter']">Thêm cổ đông</div>
                                    </Button>
                                 </AlertDialogTrigger>
                                 <AlertDialogContent className="bg-background-active border-transparent text-text-Content">
                                 <AlertDialogHeader>
                                    <AlertDialogTitle>Điền bổ sung thông tin</AlertDialogTitle>
                                    <AlertDialogDescription>
                       <div className="my-3">
                         <label htmlFor="name_holders" className="text-text-Content text-base font-medium">Tên cổ đông</label>
                         <Input 
                           id="name_holders" 
                           className="mt-3" 
                           placeholder="Nhập tên cổ đông"
                         />
                       </div>
                       <div className="my-3">
                         <label htmlFor="shares" className="text-text-Content text-base font-medium">Số cổ phần</label>
                         <Input 
                           id="shares" 
                           className="mt-3" 
                           placeholder="Nhập số cổ phần"
                         />
                       </div>
                       <div className="my-3 flex flex-col">
                         <label htmlFor="ownership" className="text-text-Content text-base font-medium">Tỉ lệ sở hữu</label>
                         <Input 
                           id="ownership" 
                           className="mt-3" 
                           placeholder="Tỉ lệ sở hữu"
                         />
                       </div>    
                       <div className="mt-3 flex">
                       <div>
                        <label htmlFor="is_foreigner" className="text-text-Content text-base font-medium">Loại cổ đông</label>
                        <Select>
                           <SelectTrigger className="mt-3 text-text-Content">
                              <SelectValue placeholder="Chọn loại cổ đông" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectGroup>
                              <SelectItem value="true">Tổ chức</SelectItem>
                              <SelectItem value="false">Cá nhân</SelectItem>
                              </SelectGroup>
                           </SelectContent>
                        </Select>
                        </div>
                       <div className="ml-20">
                       <label htmlFor="is_foreigner" className="text-text-Content text-base font-medium">Nguồn gốc</label>
                         <Select onValueChange={(value) => setData({ ...data, is_foreigner: value === "true" })} >
                           <SelectTrigger className="mt-3 text-text-Content ">
                             <SelectValue placeholder= "Chọn nguồn gốc" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectGroup>
                               <SelectItem value="true">Nước ngoài</SelectItem>
                               <SelectItem value="false">Trong nước</SelectItem>
                             </SelectGroup>
                           </SelectContent>
                         </Select>
                       </div>
                       </div>
                     </AlertDialogDescription>
                                 </AlertDialogHeader>
                                 <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-transparent">Hủy</AlertDialogCancel>
                                    <AlertDialogAction>Thêm</AlertDialogAction>
                                 </AlertDialogFooter>
                                 </AlertDialogContent>
                            </AlertDialog>
            </div>
       </div>
 
       <div className="w-[1259.43px] h-[0px] border border-[#848484] mt-10"></div>
       
       <div className="w-[1280px] h-[50px] relative mt-8">
         <div className="w-[1280px] h-[50px] left-0 top-0 absolute bg-[#274241] rounded-tl-xl rounded-tr-xl" />
         <div className="w-[1188px] h-[19px] left-[42px] top-[13px] absolute">
           <div className="w-[355px] left-0 top-0 absolute opacity-90 text-white text-xs font-normal font-['Inter']">TÊN CỔ ĐÔNG</div>
           <div className="w-[127px] left-[424px] top-0 absolute opacity-90 text-white text-xs font-normal font-['Inter']">SỐ CỔ PHẦN</div>
           <div className="left-[583px] top-0 absolute opacity-90 text-white text-xs font-normal font-['Inter']">LOẠI CỔ ĐÔNG</div>
           <div className="left-[757px] top-0 absolute opacity-90 text-white text-xs font-normal font-['Inter']">TỶ LỆ SỞ HỮU(%)</div>
           <div className="w-[89px] left-[944px] top-0 absolute opacity-90 text-white text-xs font-normal font-['Inter']">NGUỒN GỐC</div>
           <div className="left-[1098px] top-0 absolute opacity-90 text-white text-xs font-normal font-['Inter']">HÀNH ĐỘNG</div>
         </div>
       </div>
 
       {holders.slice(0, visibleCount).map((item) => (
         <div className="w-[1280px] h-[49px] relative bg-[#324E44]" key={item.id}>
           <div className="left-[41px] top-[15px] absolute opacity-90 text-white text-xs font-normal font-['Inter']">
             {item.name}
           </div>
           <div className="w-[127px] left-[465px] top-[15px] absolute opacity-90 text-white text-xs font-normal font-['Inter']">
             {item.shares.toLocaleString()}
           </div>
           <div className="w-[104px] left-[624px] top-[15px] absolute opacity-90 text-white text-xs font-normal font-['Inter']">
             {item.is_organization ? "Tổ chức" : "Cá nhân"}
           </div>
           <div className="w-[122px] left-[798px] top-[15px] absolute opacity-90 text-white text-xs font-normal font-['Inter']">
             {(item.ownership * 100).toFixed(2)}%
           </div>
           <div className="w-[89px] left-[985px] top-[15px] absolute opacity-90 text-white text-xs font-normal font-['Inter']">
             {item.is_foreigner ? "Nước ngoài" : "Trong nước"}
           </div>
           <div className="h-[30px] pl-[37px] left-[1125px] top-0 absolute justify-end items-start gap-[7px] inline-flex">
             <div className="w-[30px] h-[30px] flex justify-center items-center bg-white rounded-lg border border-[#8a8a8a] mt-2">
               <AlertDialog>
                 <AlertDialogTrigger asChild>
                   <button onClick={() => handleEdit(item)}>
                     <svg className="lucide lucide-pencil-line" xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                       <path d="M12 20h9" />
                       <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                       <path d="m15 5 3 3" />
                     </svg>
                   </button>
                 </AlertDialogTrigger>
                 <AlertDialogContent className="bg-background-active text-text-Content border-none">
                   <AlertDialogHeader>
                     <AlertDialogTitle>Chỉnh sửa thông tin cổ đông</AlertDialogTitle>
                     <AlertDialogDescription>
                       <div className="my-3">
                         <label htmlFor="name_holders" className="text-text-Content text-base font-medium">Tên cổ đông</label>
                         <Input 
                           id="name_holders" 
                           className="mt-3" 
                           value={data.name}
                           onChange={(e) => setData({ ...data, name: e.target.value })}
                         />
                       </div>
                       <div className="my-3">
                         <label htmlFor="shares" className="text-text-Content text-base font-medium">Số cổ phần</label>
                         <Input 
                           id="shares" 
                           className="mt-3" 
                           value={data.shares} 
                           onChange={(e) => setData({ ...data, shares: e.target.value || '0' })} 
                         />
                       </div>
                       <div className="my-3 flex flex-col">
                         <label htmlFor="ownership" className="text-text-Content text-base font-medium">Tỉ lệ sở hữu</label>
                         <Input 
                           id="ownership" 
                           className="mt-3" 
                           value={data.ownership} 
                           onChange={(e) => setData({ ...data, ownership: e.target.value || '0' })}
                         />
                       </div>    
                       <div className="mt-3 flex">
                       <div>
                        <label htmlFor="is_foreigner" className="text-text-Content text-base font-medium">Loại cổ đông</label>
                        <Select onValueChange={(value) => setData({ ...data, is_organization: value === "true" })} >
                           <SelectTrigger className="mt-3 text-text-Content">
                              <SelectValue placeholder={item.is_organization ? "Tổ chức" : "Cá nhân"} />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectGroup>
                              <SelectItem value="true">Tổ chức</SelectItem>
                              <SelectItem value="false">Cá nhân</SelectItem>
                              </SelectGroup>
                           </SelectContent>
                        </Select>
                        </div>
                       <div className="ml-20">
                       <label htmlFor="is_foreigner" className="text-text-Content text-base font-medium">Nguồn gốc</label>
                         <Select onValueChange={(value) => setData({ ...data, is_foreigner: value === "true" })} >
                           <SelectTrigger className="mt-3 text-text-Content ">
                             <SelectValue placeholder= {item.is_foreigner ? "Nước ngoài" : "Trong nước"} />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectGroup>
                               <SelectItem value="true">Nước ngoài</SelectItem>
                               <SelectItem value="false">Trong nước</SelectItem>
                             </SelectGroup>
                           </SelectContent>
                         </Select>
                       </div>
                       </div>
                     </AlertDialogDescription>
                   </AlertDialogHeader>
                   <AlertDialogFooter className="flex">
                     <AlertDialogCancel type="button" className="bg-transparent">Đóng</AlertDialogCancel>
                     <AlertDialogAction onClick={luuShareHolders}> Lưu </AlertDialogAction>
                   </AlertDialogFooter>
                 </AlertDialogContent>
               </AlertDialog>
             </div>
             
             <div className="w-[30px] h-[30px] flex justify-center items-center bg-white rounded-lg border border-[#8a8a8a] mt-2">
               <AlertDialog>
               <AlertDialogTrigger asChild>
                  <button>
                           <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2" > <path d="M3 6h18" /> <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /> <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /> <line x1={10} x2={10} y1={11} y2={17} /> <line x1={14} x2={14} y1={11} y2={17} /> </svg>
                  </button>
               </AlertDialogTrigger>
                  <AlertDialogContent className="bg-background-active border-transparent text-text-Content"> 
                  <AlertDialogHeader>
                     <AlertDialogTitle className="flex justify-center">Xóa cổ đông này ?</AlertDialogTitle>
                     <AlertDialogDescription>
                        Ấn xác nhận thông tin và cổ đông này sẽ bị loại bỏ khỏi danh sách cổ động lớn
                     </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex justify-center">
                     <AlertDialogCancel className="bg-transparent">Hủy</AlertDialogCancel>
                     <AlertDialogAction onClick={()=>removeHolders(item.id)}>xác nhận</AlertDialogAction>
                  </AlertDialogFooter>
                  </AlertDialogContent>
               </AlertDialog>
             </div>
           </div>
         </div>
       ))}
 
       {visibleCount < holders.length && (
         <button onClick={showMore} className="mt-4 text-white underline">
           Xem thêm
         </button>
       )}
     </>
   );
 };
 
 export default ShareHolder;
 