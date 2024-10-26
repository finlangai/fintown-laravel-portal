import { TooltipProvider } from "@/Components/UI/tooltip";
import { AuthenticatedProvider } from "@/Contexts/AuthenticatedContext";
import React from "react";
import { TerminalProvider } from "./TerminalProvider";
const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthenticatedProvider>
      <TooltipProvider>
        <TerminalProvider>{children}</TerminalProvider>
      </TooltipProvider>
    </AuthenticatedProvider>
  );
};

export default AppProviders;
