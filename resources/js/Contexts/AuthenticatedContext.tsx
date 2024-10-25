import { Toaster } from "@/Components/UI/sonner";
import React, { createContext, useContext, useState } from "react";

interface AuthenticatedContextProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

const AuthenticatedContext = createContext<
  AuthenticatedContextProps | undefined
>(undefined);

interface AuthenticatedProviderProps {
  children: React.ReactNode;
}
export const AuthenticatedProvider: React.FC<AuthenticatedProviderProps> = ({
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <AuthenticatedContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
      <Toaster richColors theme="light" />
    </AuthenticatedContext.Provider>
  );
};

export const useAuthenticated = () => {
  const context = useContext(AuthenticatedContext);
  if (!context) {
    throw new Error(
      "useAuthenticated must be used within an AuthenticatedProvider",
    );
  }
  return context;
};
