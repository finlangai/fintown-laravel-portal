import { Button } from "@/Components/UI/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/UI/dialog"
import { Input } from "@/Components/UI/input"
import { Label } from "@/Components/UI/label"
import { ToastAction } from "@/Components/UI/toast"
import { useToast } from "@/Hooks/use-toast"
import { router } from "@inertiajs/react"
import { Settings2 } from "lucide-react"
import { useState } from "react"

export default function EditOverview({ congthuc }: any) {
   console.log(congthuc);
  // Sử dụng state để theo dõi giá trị của input
  const [name, setName] = useState(congthuc.name)
  const [displayName, setDisplayName] = useState(congthuc.display_name)
  
  const { toast } = useToast()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const dataToSend = {
      order : congthuc.metadata.order,
      name,
      display_name: displayName,
    }
    console.log(dataToSend)
    try {
      
      await router.post('/updateRecipe/orverview', { data: dataToSend });
      toast({
         description: "Cập Nhập Tên công thức thành công",
         action: (
           <ToastAction altText="Goto schedule to undo">Đóng</ToastAction>
         ),
       })

    } catch (error) {
      console.error("Error:", error)
      toast({
         description: "Có lỗi xảy ra, vui lòng thử lại sau.",
         action: (
           <ToastAction altText="Goto schedule to undo">Đóng</ToastAction>
         ),
       })
      alert("Có lỗi xảy ra, vui lòng thử lại sau.")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border border-[gray] rounded-lg text-[gray] p-1 w-7 h-7">
          <Settings2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin công thức</DialogTitle>
          <DialogDescription>
            Việc chỉnh sửa này sẽ cập nhật tên công thức và tên viết tắt, giúp bạn đảm bảo tính chính xác và dễ nhận diện trong quá trình sử dụng.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left col-span-1">
                Công thức
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={name}
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-left col-span-1">
                Tên viết tắt
              </Label>
              <Input
                id="username"
                className="col-span-3"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)} 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="identifier" className="text-left col-span-1">
                Định danh
              </Label>
              <Input
                id="identifier"
                className="col-span-3 select-none cursor-not-allowed"
                value={congthuc.identifier} // Không thể thay đổi giá trị của trường này
                disabled
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Lưu thay đổi</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
