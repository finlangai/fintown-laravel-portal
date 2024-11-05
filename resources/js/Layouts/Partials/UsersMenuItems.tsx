import MenuItem from "@/Components/UI/menu-item";
import { MenuItemProvider } from "@/Contexts/MenuItemContext";
import { useSideMenu } from "@/Contexts/SideMenuContext";
import { cn } from "@/Lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { BookUser, CircleDollarSign, EarthLock, Users } from "lucide-react";
import { useState } from "react";

const UsersMenuItems = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { isMenuExpanded } = useSideMenu();

  return (
    <MenuItemProvider isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
      <li
        className={cn(
          "hover:bg-accent-color ml-2 p-2 rounded-xl text-text-head hover:text-white transition duration-300 cursor-pointer",
          !isMenuExpanded && "w-fit",
        )}
      >
        <div className="flex items-center">
          <Accordion className="flex-1" type="single" collapsible>
            <AccordionItem
              value="item-2"
              className="border-none transition-none"
            >
              <AccordionTrigger className="flex items-center w-full">
                <div className="flex justify-center items-center">
                  <Users className="size-6" />
                  {isMenuExpanded && (
                    <span className="ml-4 text-xs whitespace-nowrap">
                      Quản lý khách hàng
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-2">
                <ul>
                  {/* === */}
                  <MenuItem label="Danh sách khách hàng">
                    <BookUser className="size-6" />
                  </MenuItem>

                  {/* === */}
                  <MenuItem label="Cài đặt quyền hạn">
                    <EarthLock className="size-6" />
                  </MenuItem>

                  {/* === */}
                  <MenuItem label="Quản lý gói đăng ký">
                    <CircleDollarSign className="size-6" />
                  </MenuItem>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </li>
    </MenuItemProvider>
  );
};

export default UsersMenuItems;
