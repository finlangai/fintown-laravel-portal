import { toast } from "sonner";

// === TOAST HANDLER
interface ToastData {
  content: string;
  type: string;
}
export function toastHandler(toastData: ToastData) {
  const { content, type } = toastData;
  switch (type) {
    case "success":
      toast.success(content);
      break;
    case "info":
      toast.info(content);
      break;
    case "error":
      toast.error(content);
      break;
    case "warning":
      toast.warning(content);
      break;
    default:
      toast(content);
      break;
  }
}
