import { Toaster } from "@/Components/UI/toaster";
import { useToast } from "@/Hooks/use-toast";
import { Input } from "@headlessui/react";
import { router } from "@inertiajs/react";
import { ToastAction } from "@radix-ui/react-toast";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

export default function Recipe({ congthuc }: any) {
  // Sử dụng useState để lưu congthuc và có thể cập nhật nó khi thay đổi
  const [CongthucChiso, SetCongthucChiso] = useState(congthuc);

  // Chuyển đổi slug thành ngôn ngữ tự nhiên
  function slugToNaturalLanguage(slug: string) {
    return slug
      .replace(/{|}/g, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function handleNameChange(index: number, newName: string) {
    const updatedCongthuc = { ...CongthucChiso };
    updatedCongthuc.library[index].name = newName;

    SetCongthucChiso(updatedCongthuc);
  }
  const { toast } = useToast();
  async function handleUpdate() {
    try {
      // Kiểm tra và chuẩn bị dữ liệu để gửi đi
      const updatedData = CongthucChiso.library.map(
        (lib: any, index: number) => {
          if (!CongthucChiso.metadata?.order) {
            throw new Error("Order is missing");
          }

          return {
            name: lib.name,
            recipe: lib.expression,
            order: CongthucChiso.metadata.order,
          };
        },
      );

      await router.post(
        route("formulars.technical-indicators.editNameRecipe"),
        { data: updatedData },
      );
      toast({
        description: "Cập Nhập Tên công thức thành công",
        action: <ToastAction altText="Goto schedule to undo">Đóng</ToastAction>,
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        description: "Có lỗi ...",
        action: <ToastAction altText="Goto schedule to undo">Đóng</ToastAction>,
      });
    }
  }

  return (
    <div>
      <Toaster />
      {CongthucChiso.library.map((lib: any, index: number) => (
        <div key={index} className="space-y-2 p-5">
          <strong className="text-gradient">
            Công thức {CongthucChiso.library.length > 1 ? index + 1 : ""}
          </strong>
          <strong className="block border-2 border-gray-900 p-2 rounded-md font-bold text-gradient cursor-not-allowed select-none">
            {` ${slugToNaturalLanguage(lib.expression)}`}
          </strong>
          <div className="flex justify-start items-center space-x-4">
            <Input
              type="text"
              placeholder="Nhập giá trị"
              value={lib.name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="border-2 border-gray-900 bg-white focus:border-blue-500 rounded-lg w-1/3 h-10 font-bold select-none"
            />
            <button
              onClick={handleUpdate}
              className="block justify-center items-center border-2 border-gray-500 px-3 py-1 rounded-md h-10 font-bold hover:text-red-500 transform transition-all duration-300 ease-in-out hover:scale-105"
            >
              <SendHorizontal className="text-gray-400 hover:text-red-500 transition-all duration-300 ease-in-out" />
            </button>
          </div>
          <div className={`space-y-2`}>
            <strong className="text-gray-800">Tham số:</strong>
            <div className="flex flex-wrap gap-2 text-gray-600">
              {lib.parameters.map((param: any, idx: number) => (
                <div
                  key={idx}
                  className="border-gray-600 p-2 border rounded-xl w-auto"
                >
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
