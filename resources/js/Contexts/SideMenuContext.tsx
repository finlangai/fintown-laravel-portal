import { createContext, ReactNode, useContext, useState } from "react";

type SideMenuContextProps = {
  isMenuExpanded: boolean;
  setIsMenuExpanded: (value: boolean) => void;
};

const SideMenuContext = createContext<SideMenuContextProps | undefined>(
  undefined,
);

export const SideMenuProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(true);

  return (
    <SideMenuContext.Provider value={{ isMenuExpanded, setIsMenuExpanded }}>
      {children}
    </SideMenuContext.Provider>
  );
};

export const useSideMenu = () => {
  const context = useContext(SideMenuContext);
  if (!context) {
    throw new Error("useSideMenu must be used within a SideMenuProvider");
  }
  return context;
};
