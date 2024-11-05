import { Link } from "@inertiajs/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import {
  ChartNoAxesGantt,
  UserCheck,
  UserPen,
  UserRoundCog,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";

interface StaffLiProps {
  isExpanded: boolean;
}

const StaffLi = ({ isExpanded }: StaffLiProps) => {
  return (
    <li className="hover:bg-accent-color ml-2 p-2 rounded-xl text-text-head transition duration-300 cursor-pointer">
      <div className="flex items-center">
        {isExpanded ? (
          <Accordion type="single" collapsible>
            <AccordionItem
              value="item-2"
              className="border-none hover:text-white transition-none"
            >
              <AccordionTrigger className="flex justify-center items-center h-fit">
                <UserRoundCog />
                <span className="flex items-center ml-4 text-center text-xs whitespace-nowrap">
                  Quản lí Người dùng
                </span>
              </AccordionTrigger>
              <AccordionContent className="ml-2">
                <ul>
                  <li className="mt-5 hover:underline">
                    <Link href="/staff-list">
                      <div className="flex justify-start items-center">
                        <UserRoundCog />
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Danh sách nhân viên
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="mt-5 hover:underline">
                    <Link href="/add-staff">
                      <div className="flex justify-start items-center">
                        <UserRoundPlus />
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Danh sách khách hàng
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="mt-5 hover:underline">
                    <Link href="/staff">
                      <div className="flex justify-start items-center">
                        <UserRoundPlus />
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Phân quyền
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="mt-5 hover:underline">
                    <Link href="/staff/role">
                      <div className="flex justify-start items-center">
                        <UsersRound size={20} />
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Vai trò
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="mt-5 hover:underline">
                    <Link href="/staff/permission">
                      <div className="flex justify-start items-center">
                        <ChartNoAxesGantt size={20} />
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Quyền sử dụng
                        </span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Accordion type="single" collapsible defaultValue="item-2">
            <AccordionItem
              value="item-2"
              className="border-none hover:text-white transition-none"
            >
              <AccordionTrigger>
                <div className="inline-block relative">
                  <UserRoundCog />
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-2">
                <ul>
                  <li className="mt-5">
                    <HoverCard>
                      <HoverCardTrigger className="hover:bg-accent-color-sub">
                        <Link href="/staff-list">
                          <UserCheck />
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent side="right" align="start">
                        Danh sách nhân viên
                      </HoverCardContent>
                    </HoverCard>
                  </li>
                  <li className="mt-5">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Link href="/add-staff">
                          <UserRoundPlus />
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent side="right" align="start">
                        Danh sách khách hàng
                      </HoverCardContent>
                    </HoverCard>
                  </li>
                  <li className="mt-5">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Link href="/add-staff">
                          <UserPen />
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent side="right" align="start">
                        Phân quyền
                      </HoverCardContent>
                    </HoverCard>
                  </li>
                  <li className="mt-5">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Link href="/staff/role">
                          <UsersRound size={20} />
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent side="right" align="start">
                        Vai trò
                      </HoverCardContent>
                    </HoverCard>
                  </li>
                  <li className="mt-5">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Link href="/staff/permission">
                          <ChartNoAxesGantt size={20} />
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent side="right" align="start">
                        Quyền sử dụng
                      </HoverCardContent>
                    </HoverCard>
                  </li>
                  <li></li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </li>
  );
};

export default StaffLi;
