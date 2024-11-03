import DialogWrapper from "@/Components/Specialized/dialog-wrapper";
import { PencilRuler } from "lucide-react";
import { useRef } from "react";
import { useForm } from "@inertiajs/react";
import { Toaster } from "@/Components/UI/toaster";
import { useToast } from "@/Hooks/use-toast";

const EditRole = ({ Role }: { Role: Role }) => {
  const { toast } = useToast();
  const { data, setData, put, processing, errors } = useForm({
    name: Role.name,
    // Không bao gồm guard_name nữa
  });

  const dialogRef = useRef<any>(null); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/roles/edit/${Role.id}`, {
      data: {
        name: data.name, // Gửi chỉ có 'name'
        // Không gửi guard_name
      },
      onSuccess: () => {
        toast({
          title: "Thành công",
          description: "Chỉnh sửa thông tin role thành công",
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
      title="Chỉnh sửa thông tin Role !"
      trigger={
        <button className="flex items-center justify-center w-7 h-7 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-200" title="Chỉnh sửa">
          <PencilRuler className="inline h-4 w-4" />
        </button>
      }
      footer={null} 
    >
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tên Role</label>
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

export default EditRole;
