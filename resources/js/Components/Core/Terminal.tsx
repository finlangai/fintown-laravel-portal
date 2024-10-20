import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";

const Terminal = forwardRef((_, ref) => {
  const [messages, setMessages] = useState<{ text: string; time: string }[]>(
    [],
  );

  // Expose methods to parent components
  useImperativeHandle(ref, () => ({
    writeMessage: (message: string) => {
      const newMessage = {
        text: message,
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    },
    flush: () => {
      setMessages([]);
    },
  }));

  return (
    <div className="bg-black p-[10px] border h-[300px] font-mono text-white overflow-y-scroll">
      {messages.map((msg, index) => (
        <div key={index} style={messageStyle}>
          <span style={timeStyle}>[{msg.time}]</span> {msg.text}
        </div>
      ))}
    </div>
  );
});

const messageStyle = {
  marginBottom: "5px",
};

const timeStyle = {
  color: "gray",
  marginRight: "5px",
};

export default Terminal;
