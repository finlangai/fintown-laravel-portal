import { createContext, ReactNode, useContext } from "react";

type BackjobsPageContextProps = {
  backjobs: Backjob[];
};

const BackjobsPageContext = createContext<BackjobsPageContextProps | undefined>(
  undefined,
);

export const BackjobsPageProvider = ({
  children,
  backjobs,
}: { children: ReactNode } & BackjobsPageContextProps) => {
  return (
    <BackjobsPageContext.Provider value={{ backjobs }}>
      {children}
    </BackjobsPageContext.Provider>
  );
};

export const useBackjobsPage = () => {
  const context = useContext(BackjobsPageContext);
  if (!context) {
    throw new Error(
      "useBackjobsPage must be used within a BackjobsPageProvider",
    );
  }
  return context;
};
