import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/UI/dropdown-menu";
import Dropdown from "@/Components/Dropdown";
import { ChevronDown, Settings, User } from "lucide-react";

const HeaderTopDropdown = ({ user }: any) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="[&>div>svg]:data-[state=open]:rotate-180 outline-none hover:bg-slate-50 rounded-lg">
        <DropdownMenuLabel className="text-right flex items-center gap-1">
          <div className="text-right flex flex-col">
            <strong className="text-lg text-slate-700">
              {user.fullname ?? "My Account"}
            </strong>
            <span className="text-slate-400 text-xs">Super Admin</span>
          </div>
          <ChevronDown className="transition-transform duration-300 ease-out size-7 stroke-slate-500" />
        </DropdownMenuLabel>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="border border-solid">
        <DropdownMenuSeparator className="text-black" />
        <DropdownMenuItem>
          <Dropdown.Link href={route("profile.edit")}>
            <div
              className="flex justify-start items-center"
              style={{ marginLeft: "-16px" }}
            >
              <User className="size-5" />
              <span className="ml-3">Hồ sơ cá nhân</span>
            </div>
          </Dropdown.Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Dropdown.Link href={route("profile.edit")}>
            <div
              className="flex justify-start items-center"
              style={{ marginLeft: "-16px" }}
            >
              <Settings />
              <span className="ml-3">Cài đặt tài khoản</span>
            </div>
          </Dropdown.Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderTopDropdown;
