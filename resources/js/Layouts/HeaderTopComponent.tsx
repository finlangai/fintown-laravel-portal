import HeaderTopDowndown from "./Partials/Header/HeaderTopDropdown";
import { Separator } from "@/Components/UI/separator";
import TerminalToggleButton from "./Partials/Header/TerminalToggleButton";
import { FunctionSearch } from "./Partials/Header/FunctionSearch";

const HeaderTopComponent = ({ user }: any) => {
  return (
    <nav className="top-0 z-50 sticky border-slate-200 bg-background-theme shadow-md py-1 border-b">
      <div className="flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div>
          <FunctionSearch />
        </div>
        {/* RIGHT - TOP HEADER */}
        <div className="flex items-center gap-3">
          <TerminalToggleButton />
          <Separator
            orientation="vertical"
            className="bg-slate-200 mx-3 w-[2px] h-9"
          />
          <HeaderTopDowndown user={user} />
        </div>
      </div>
    </nav>
  );
};
export default HeaderTopComponent;
