import { UserPageProps } from "@/Pages/User/User";
import { createContext, ReactNode, useContext } from "react";

type UserPageContextProps = {} & UserPageProps;

const UserPageContext = createContext<UserPageContextProps | undefined>(
  undefined,
);

export const UserPageProvider = ({
  children,
  paginating,
}: { children: ReactNode } & UserPageContextProps) => {
  return (
    <UserPageContext.Provider value={{ paginating }}>
      {children}
    </UserPageContext.Provider>
  );
};

export const useUserPage = () => {
  const context = useContext(UserPageContext);
  if (!context) {
    throw new Error("useUserPage must be used within a UserPageProvider");
  }
  return context;
};
