import { Button } from "@/Components/UI/button";
import { useRGBA } from "@/Hooks/useRGBA";
import { router } from "@inertiajs/react";
import { memo, useEffect, useRef, useState } from "react";
function AddButton({
  className,
  children,
  ...props
}: {
  className: string;
  children: string;
  props?: object;
}) {
  const textRef = useRef<HTMLElement>(null); // Tạo ref để tham chiếu đến phần tử text
  const [textColor, setTextColor] = useState<string>(""); // Màu của Text
  const [opacityStateLayer, setOpacityStateLayer] = useState<number>(0);
  const stateLayerColor = useRGBA(textColor, opacityStateLayer);

  const handleNavigate = () => {
    router.visit(route("subscription.programs.create"), {
      method: "get",
    });
  };

  // Hàm lấy màu của phần tử
  const getTextColor = () => {
    if (textRef.current) {
      const computedTextColor = window.getComputedStyle(textRef.current);
      const currentTextColor = computedTextColor.color;
      setTextColor(currentTextColor);
    }
  };

  // Lấy màu text khi render lần đầu
  useEffect(() => {
    getTextColor();
  }, []);

  return (
    <Button
      className={`w-fit h-fit p-0  ${className}`}
      {...props}
      onClick={handleNavigate}
    >
      <div
        style={{
          backgroundColor: stateLayerColor,
        }}
        className="px-[16px] py-[12px] w-fit h-fit"
      >
        <span ref={textRef}>{children}</span>
      </div>
    </Button>
  );
}

export default memo(AddButton);
