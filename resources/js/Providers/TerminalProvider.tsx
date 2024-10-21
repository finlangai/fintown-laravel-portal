import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface TerminalMessage {
  text: string;
  time: string;
}

interface TerminalContextProps {
  messages: TerminalMessage[];
  writeMessage: (message: string) => void;
  flush: () => void;
  toggleMinimize: () => void;
  isMinimized: boolean;
  toggleTerminal: () => void;
  isClosed: boolean;
}

interface TerminalProviderProps {
  children: ReactNode;
}

export const TerminalContext = createContext<TerminalContextProps | undefined>(
  undefined,
);

export const TerminalProvider: React.FC<TerminalProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<TerminalMessage[]>([]);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isClosed, setIsClosed] = useState(true);

  const writeMessage = (message: string) => {
    const newMessage = {
      text: message,
      time: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const flush = () => {
    setMessages([]);
  };

  const toggleMinimize = () => {
    setIsMinimized((prevState) => !prevState);
  };
  const toggleTerminal = () => {
    setIsClosed((prevState) => !prevState);
  };

  return (
    <TerminalContext.Provider
      value={{
        messages,
        writeMessage,
        flush,
        toggleMinimize,
        isMinimized,
        toggleTerminal,
        isClosed,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};
