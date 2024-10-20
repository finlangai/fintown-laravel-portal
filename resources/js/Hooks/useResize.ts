import { useRef } from "react";

export const useResize = (setSize: (height: number) => void) => {
  const isResizing = useRef(false);

  const startResize = () => {
    if (!isResizing.current) {
      isResizing.current = true;
      document.addEventListener("mousemove", onResize);
      document.addEventListener("mouseup", stopResize);
    }
  };

  const onResize = (event: MouseEvent) => {
    if (isResizing.current) {
      const newSize = window.innerHeight - event.clientY;
      setSize(newSize);
    }
  };

  const stopResize = () => {
    if (isResizing.current) {
      isResizing.current = false;
      document.removeEventListener("mousemove", onResize);
      document.removeEventListener("mouseup", stopResize);
    }
  };

  return { startResize };
};
