import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/Components/UI/dialog";
import { UserRoundPen } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

const EditStaff = ({ staff } : any) => {
   const { data, setData, put, processing, errors, reset } = useForm({
       username: staff.username,
       email: staff.email,
       fullname: staff.fullname || '',
   });

   const handleSubmit = (e : any) => {
       e.preventDefault();

       // Kiểm tra dữ liệu trước khi gửi
       if (!data.username || !data.email || !data.fullname) {
           console.error('Vui lòng điền đầy đủ thông tin.');
           return; // Ngăn không cho gửi nếu dữ liệu không hợp lệ
       }

       put(`/staffedit/${staff.id}`, {
           data: {
               username: data.username,
               email: data.email,
               fullname: data.fullname,
           },
           onSuccess: () => {
               console.log('Thông tin nhân viên đã được cập nhật.');
               reset(); // Reset dữ liệu sau khi thành công
           },
           onError: (errors) => {
               console.error('Có lỗi xảy ra khi cập nhật thông tin nhân viên.', errors);
           },
       });
   };

   return (
       <Dialog>
           <DialogTrigger>
               <UserRoundPen className="text-[blue] w-5 h-5" />
           </DialogTrigger>
           <DialogContent>
               <DialogHeader>
                   <DialogTitle>Chỉnh sửa thông tin nhân viên</DialogTitle>
                   <DialogDescription>
                       Vui lòng cập nhật thông tin dưới đây:
                   </DialogDescription>
               </DialogHeader>
               <form onSubmit={handleSubmit} className="space-y-4">
                   <div>
                       <label htmlFor="employee-name" className="block text-sm font-medium text-gray-700">
                           Tên nhân viên
                       </label>
                       <input
                           type="text"
                           id="employee-name"
                           value={data.username} 
                           onChange={(e) => setData('username', e.target.value)} 
                           placeholder="Nhập tên nhân viên"
                           className={`mt-1 block w-full border ${errors.username ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2`}
                       />
                       {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
                   </div>
                   <div>
                       <label htmlFor="employee-email" className="block text-sm font-medium text-gray-700">
                           Email
                       </label>
                       <input
                           type="email"
                           id="employee-email"
                           value={data.email} 
                           onChange={(e) => setData('email', e.target.value)}    
                           placeholder="Nhập email"
                           className={`mt-1 block w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2`}
                       />
                       {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                   </div>
                   <div>
                       <label htmlFor="employee-fullname" className="block text-sm font-medium text-gray-700">
                           FullName
                       </label>
                       <input
                           type="text"
                           id="employee-fullname"
                           value={data.fullname} 
                           onChange={(e) => setData('fullname', e.target.value)} 
                           placeholder="Nhập số điện thoại"
                           className={`mt-1 block w-full border ${errors.fullname ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2`}
                       />
                       {errors.fullname && <span className="text-red-500 text-sm">{errors.fullname}</span>}
                   </div>
                   <div>
                       <button
                           type="submit"
                           className={`w-full ${processing ? "bg-gray-500" : "bg-custom-button-warning"} text-white font-semibold py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50`}
                           disabled={processing} 
                       >
                           {processing ? "Đang lưu..." : "Lưu thông tin"}
                       </button>
                   </div>
               </form>
           </DialogContent>
       </Dialog>
   );
};

export default EditStaff;
