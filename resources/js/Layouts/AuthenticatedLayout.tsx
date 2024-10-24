import Terminal from "@/Components/Terminal/Terminal";
import { useAuthenticated } from "@/Contexts/AuthenticatedContext";
import { cn } from "@/Lib/utils";
import { usePage } from "@inertiajs/react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { PropsWithChildren } from "react";
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
  const handleSetIsExpanded = (value: boolean) => {
    setIsExpanded(value);
  };

  return (
    <div className="top-0 sticky flex min-h-screen transition-all duration-300">
      {/* đây là sidebar bên trái*/}
      {header ? (
        <header
          className={`bg-background-sibar sticky top-0 shadow max-h-screen ${isExpanded ? "w-60" : "w-20"} transition-all duration-300 ease-in-out`}
          // onMouseLeave={() => setIsExpanded(false)}
        >
          <div className="relative px-3 w-full h-full max-h-screen">
            <HeaderComponent
              isExpanded={isExpanded}
              handleSetIsExpanded={handleSetIsExpanded}
            />
            {/* === START - OPEN AND CLOSE MENU BUTTON */}
            <div className="top-1/2 -right-3 absolute">
              <button
                onClick={() => {
                  handleSetIsExpanded(!isExpanded);
                }}
                className="bg-background-sibar py-3 rounded-2xl"
              >
                {isExpanded ? (
                  <ChevronsLeft className="stroke-text-active" />
                ) : (
                  <ChevronsRight className="stroke-text-active" />
                )}
              </button>
            </div>
            {/* END - OPEN AND CLOSE MENU BUTTON === */}
          </div>
        </header>
      ) : (
        ""
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
