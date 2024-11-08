import { UserRolesPageProps } from "@/Pages/User/UserRoles";
import { createContext, ReactNode, useContext } from "react";

type UserRolesPageContextProps = {} & UserRolesPageProps;

const UserRolesPageContext = createContext<
  UserRolesPageContextProps | undefined
>(undefined);

export const UserRolesPageProvider = ({
  children,
  roles,
  permissions,
}: { children: ReactNode } & UserRolesPageContextProps) => {
  return (
    <UserRolesPageContext.Provider value={{ roles, permissions }}>
      {children}
    </UserRolesPageContext.Provider>
  );
};

export const useUserRolesPage = () => {
  const context = useContext(UserRolesPageContext);
  if (!context) {
    throw new Error(
      "useUserRolesPage must be used within a UserRolesPageProvider",
    );
  }
  return context;
};
