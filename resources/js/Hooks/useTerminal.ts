import { TerminalContext } from "@/Providers/TerminalProvider";
import { useContext } from "react";

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
};
