import DialogWrapper from "@/Components/Specialized/dialog-wrapper";
import { PencilRuler } from "lucide-react";
import { useRef } from "react";
import { useForm } from "@inertiajs/react";
import { Toaster } from "@/Components/UI/toaster";
import { useToast } from "@/Hooks/use-toast";

const PermissionEdit = ({ Permission }: { Permission: Permission }) => {
  const { toast } = useToast();
  const { data, setData, put, processing, errors } = useForm({
    name: Permission.name, 
  });

  const dialogRef = useRef<any>(null); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/Permission/edit/${Permission.id}`, {
      data: {
        name: data.name, 
      },
      onSuccess: () => {
        toast({
          title: "Thành công",
          description: "Chỉnh sửa thông tin Permission thành công",
        });
        dialogRef.current.toggle(); 
      },
      onError: () => {
        toast({
          title: "Thất bại",
          description: "Thông tin bạn nhập không đúng",
        });
      },
    });
  };

  return (
    <DialogWrapper
      ref={dialogRef}
      title="Chỉnh sửa thông tin Permission !"
      trigger={
        <button className="text-green-500 hover:text-green-700 transition duration-200" title="Chỉnh sửa">
          <PencilRuler className="inline h-4 w-4" />
        </button>
      }
      footer={null} 
    >
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tên Permission</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-500"
            required
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
            disabled={processing} 
          >
            {processing ? "Đang cập nhật..." : "Cập nhật"} 
          </button>
        </div>
      </form>
    </DialogWrapper>
  );
};

export default PermissionEdit;
