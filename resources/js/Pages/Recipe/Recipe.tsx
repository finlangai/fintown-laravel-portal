import { Toaster } from '@/Components/UI/toaster';
import { useToast } from '@/Hooks/use-toast';
import { Input } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { ToastAction } from '@radix-ui/react-toast';
import { SendHorizontal } from 'lucide-react';
import React, { useState } from 'react';

export default function Recipe({ congthuc }: any) {
  // Sử dụng useState để lưu congthuc và có thể cập nhật nó khi thay đổi
  const [CongthucChiso, SetCongthucChiso] = useState(congthuc);

  // Chuyển đổi slug thành ngôn ngữ tự nhiên
  function slugToNaturalLanguage(slug: string) {
    return slug
      .replace(/{|}/g, '') 
      .replace(/_/g, ' ')   
      .replace(/\b\w/g, char => char.toUpperCase()); 
  }

  function handleNameChange(index: number, newName: string) {
    const updatedCongthuc = { ...CongthucChiso };
    updatedCongthuc.library[index].name = newName;

    SetCongthucChiso(updatedCongthuc);
  }
  const { toast } = useToast()
  async function handleUpdate() {
   try {
     // Kiểm tra và chuẩn bị dữ liệu để gửi đi
     const updatedData = CongthucChiso.library.map((lib: any, index: number) => {
       if (!CongthucChiso.metadata?.order) {
         throw new Error('Order is missing');
       }
 
       return {
         name: lib.name,  
         recipe : lib.expression,
         order: CongthucChiso.metadata.order, 
       };
     });
 
 
     await router.post('/updateName/Recipe', { data: updatedData });
     toast({
      description: "Cập Nhập Tên công thức thành công",
      action: (
        <ToastAction altText="Goto schedule to undo">Đóng</ToastAction>
      ),
    })
   } catch (error) {
     console.error('Error:', error); 
     toast({
      description: "Có lỗi ...",
      action: (
        <ToastAction altText="Goto schedule to undo">Đóng</ToastAction>
      ),
    })
   }
 }
 
 
 

  return (
    <div>
      <Toaster/>
      {CongthucChiso.library.map((lib: any, index: number) => (
        <div key={index} className="space-y-2 p-5">
          <strong className="text-gradient">Công thức {CongthucChiso.library.length > 1 ? index + 1 : ""}</strong>
          <strong className="text-gradient select-none cursor-not-allowed border-2 font-bold border-gray-900 block rounded-md p-2">
            {` ${slugToNaturalLanguage(lib.expression)}`}
          </strong>
          <div className="flex justify-start items-center space-x-4">
            <Input
              type="text"
              placeholder="Nhập giá trị"
              value={lib.name}
              onChange={(e) => handleNameChange(index, e.target.value)} 
              className="border-2 select-none font-bold border-gray-900 rounded-lg focus:border-blue-500 bg-white w-1/3 h-10"
            />
            <button 
              onClick={handleUpdate} 
              className="border-2 font-bold border-gray-500 block rounded-md py-1 px-3 h-10 items-center justify-center hover:text-red-500 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <SendHorizontal className="text-gray-400 hover:text-red-500 transition-all duration-300 ease-in-out" />
            </button>
          </div>
          <div className={`space-y-2`}>
            <strong className="text-gray-800">Tham số:</strong>
            <div className="flex flex-wrap gap-2 text-gray-600">
              {lib.parameters.map((param: any, idx: number) => (
                <div key={idx} className="w-auto border-gray-600 border p-2 rounded-xl">
                  <p className="font-semibold text-gray-700">{param.field}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
