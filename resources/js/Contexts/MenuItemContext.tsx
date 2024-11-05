import { createContext, ReactNode, useContext } from "react";

type MenuItemContextProps = {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
};

const MenuItemContext = createContext<MenuItemContextProps | undefined>(
  undefined,
);

export const MenuItemProvider = ({
  children,
  isExpanded,
  setIsExpanded,
}: { children: ReactNode } & MenuItemContextProps) => {
  return (
    <MenuItemContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </MenuItemContext.Provider>
  );
};

export const useMenuItem = () => {
  const context = useContext(MenuItemContext);
  if (!context) {
    throw new Error("useMenuItem must be used within a MenuItemProvider");
  }
  return context;
};
