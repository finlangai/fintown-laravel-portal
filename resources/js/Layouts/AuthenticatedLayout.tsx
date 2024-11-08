import Terminal from "@/Components/Widgets/Terminal/Terminal";
import { useAuthenticated } from "@/Contexts/AuthenticatedContext";
import { SideMenuProvider } from "@/Contexts/SideMenuContext";
import { toastHandler } from "@/Lib/toastHandler";
import { cn } from "@/Lib/utils";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren, useEffect } from "react";
import HeaderComponent from "./HeaderComponent";
import HeaderTopComponent from "./HeaderTopComponent";

type AuthenticatedProps = PropsWithChildren<{
  header: boolean;
  className?: string;
}>;

export default function Authenticated({
  header,
  className,
  children,
}: AuthenticatedProps) {
  const user = usePage().props.auth?.user || {
    fullname: "ADMIN",
    email: "Email@example.com",
  };

  const { isExpanded, setIsExpanded } = useAuthenticated();

  const { toastMessage }: any = usePage().props;

  useEffect(() => {
    if (toastMessage) {
      toastHandler(toastMessage);
    }
  }, [toastMessage]);

  return (
    <div className="top-0 sticky flex min-h-screen transition-all duration-300">
      {/* đây là sidebar bên trái*/}
      {header && (
        <SideMenuProvider>
          <HeaderComponent />
        </SideMenuProvider>
      )}
      <div className="flex-1 transition-all">
        {/* cục này là cái header top */}
        <HeaderTopComponent user={user} />

        {/* Phần content */}
        <main className={cn("bg-transparent", className)}>{children}</main>
      </div>
      <Terminal />
    </div>
  );
}
