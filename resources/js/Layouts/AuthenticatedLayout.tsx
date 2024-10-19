import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import { Link, usePage } from "@inertiajs/react";
import HeaderComponent from "./HeaderComponent";
import HeaderTopComponent from "./HeaderTopComponent";
type AuthenticatedProps = PropsWithChildren<{
  header : boolean;
}>;
export default function Authenticated({
  header,
  children,
}: AuthenticatedProps) {
  const user = usePage().props.auth?.user || {  
    fullname: "ADMIN",
    email: "Email@example.com",
  };
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleSetIsExpanded = (value: boolean) => {
    setIsExpanded(value);
  };
  
  return (
    <div className="flex bg-gray-100 min-h-screen transition-all duration-300">
      {/* đây là sidebar bên trái*/}
      {
        header ? (
          <header
            className={`bg-background-sibar shadow ${ isExpanded ? "w-60" : "w-20" } transition-all duration-300 ease-in-out`} onMouseLeave={() => setIsExpanded(false)}>
              <div className="fixed ml-3 h-full">
              <HeaderComponent  isExpanded={isExpanded} handleSetIsExpanded={handleSetIsExpanded}/>
            </div>
          </header>
        ) : ("")
      }
      <div className="flex-1 transition-all">
        {/* cục này là cái header top */}
        <HeaderTopComponent user={user}/>

        {/* Phần content */}
        <main className="bg-background-theme">{children}</main>
      </div>
    </div>
  );
}
