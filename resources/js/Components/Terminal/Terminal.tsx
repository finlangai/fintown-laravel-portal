import { useResize } from "@/Hooks/useResize";
import { useTerminal } from "@/Hooks/useTerminal";
import { ListRestart, Maximize, Maximize2, Minus, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { TerminalBody } from "./TerminalBodyStyled";

const Terminal: React.FC = () => {
  const {
    messages,
    isMinimized,
    toggleMinimize,
    flush,
    isClosed,
    toggleTerminal,
  } = useTerminal();
  const [height, setHeight] = useState(300);
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const { startResize } = useResize(setHeight);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    !isClosed && (
      <div
        ref={terminalRef}
        className={`z-[100] fixed bottom-0 left-0 w-full bg-black bg-opacity-80 text-white font-mono ${isMinimized ? "h-8" : ""}`}
        style={{ height: isMinimized ? "48px" : `${height}px` }}
      >
        {/* === RESIZE BAR */}
        <div
          className="bg-accent-color bg-opacity-70 w-full h-1 cursor-ns-resize select-none"
          onMouseDown={() => {
            if (isMinimized) toggleMinimize();
            startResize();
          }}
        ></div>

        {/* === TERMINAL BUTTONS */}
        <div className="flex justify-between items-center border-gray-700 px-8 p-2 border-b">
          <span>Terminal</span>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMinimize}
              className="hover:bg-gray-500 p-1 text-gray-300 text-xs"
              title={isMinimized ? "Hiển thị" : "Thu gọn"}
            >
              {isMinimized ? <Maximize width={21} /> : <Minus width={21} />}
            </button>
            <button
              onClick={() => {
                setHeight(window.innerHeight);
                if (isMinimized) {
                  toggleMinimize();
                }
              }}
              className="hover:bg-gray-500 p-1 text-gray-300 text-xs"
              title="Phóng to"
            >
              {<Maximize2 width={21} />}
            </button>
            <button
              onClick={() => {
                flush();
                setHeight(300);
              }}
              className="hover:bg-gray-500 p-1 text-gray-300 text-xs"
              title="Đặt lại Terminal"
            >
              <ListRestart width={21} />
            </button>
            <button
              onClick={toggleTerminal}
              className="hover:bg-gray-500 p-1 text-gray-300 text-xs"
              title="Đóng Terminal"
            >
              <X width={21} />
            </button>
          </div>
        </div>

        {/* === TERMINAL BODY */}
        {!isMinimized && (
          <TerminalBody
            ref={terminalBodyRef}
            className="p-2 pb-24 h-full overflow-y-scroll"
          >
            {messages.map((msg, index) => (
              <div key={index} className="flex gap-9 mb-1 ms-2 ps-20">
                <span className="text-gray-400">[{msg.time}]</span>
                <span>{msg.text}</span>
              </div>
            ))}
          </TerminalBody>
        )}
      </div>
    )
  );
};

export default Terminal;
