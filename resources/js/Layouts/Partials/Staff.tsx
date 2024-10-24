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
import { UserCheck, UserPen, UserRoundCog, UserRoundPlus } from "lucide-react";

interface StaffLiProps {
  isExpanded: boolean;
}

const StaffLi = ({ isExpanded }: StaffLiProps) => {
  return (
    <li className="hover:bg-accent-color ml-2 p-2 rounded-xl text-text-head hover:text-white transition duration-300 cursor-pointer">
      <div className="flex items-center">
        {isExpanded ? (
          <Accordion type="single" collapsible>
            <AccordionItem
              value="item-2"
              className="border-none transition-none"
            >
              <AccordionTrigger className="flex items-center">
                <div className="flex justify-center items-center">
                  <UserRoundCog className="size-5" />
                  <span className="ml-4 text-xs whitespace-nowrap">
                    Quản lí nhân viên
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-2">
                <ul>
                  <li className="mt-5 hover:underline">
                    <Link href="/staff-list">
                      <div className="flex justify-start items-center">
                        <UserCheck className="size-5" />
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Danh sách nhân viên
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="mt-5 hover:underline">
                    <Link href="/add-staff">
                      <div className="flex justify-start items-center">
                        <UserRoundPlus className="size-5" />
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Thêm nhân viên
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="mt-5 hover:underline">
                    <Link href="/staff">
                      <div className="flex justify-start items-center">
                        <UserRoundPlus className="size-5" />
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Phân quyền
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
                  <UserRoundCog className="size-5" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-2">
                <ul>
                  <li className="mt-5">
                    <HoverCard>
                      <HoverCardTrigger className="hover:bg-accent-color-sub">
                        <Link href="/staff-list">
                          <UserCheck className="size-5" />
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
                          <UserRoundPlus className="size-5" />
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent side="right" align="start">
                        Thêm nhân viên
                      </HoverCardContent>
                    </HoverCard>
                  </li>
                  <li className="mt-5">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Link href="/add-staff">
                          <UserPen className="size-5" />
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent side="right" align="start">
                        Phân quyền
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
