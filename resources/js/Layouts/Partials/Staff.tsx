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
              <AccordionTrigger>
                <div className="flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-user-round-cog"
                  >
                    {" "}
                    <path d="M2 21a8 8 0 0 1 10.434-7.62" />{" "}
                    <circle cx={10} cy={8} r={5} />{" "}
                    <circle cx={18} cy={18} r={3} />{" "}
                    <path d="m19.5 14.3-.4.9" /> <path d="m16.9 20.8-.4.9" />{" "}
                    <path d="m21.7 19.5-.9-.4" /> <path d="m15.2 16.9-.9-.4" />{" "}
                    <path d="m21.7 16.5-.9.4" /> <path d="m15.2 19.1-.9.4" />{" "}
                    <path d="m19.5 21.7-.4-.9" /> <path d="m16.9 15.2-.4-.9" />{" "}
                  </svg>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-user-check"
                        >
                          {" "}
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />{" "}
                          <circle cx={9} cy={7} r={4} />{" "}
                          <polyline points="16 11 18 13 22 9" />{" "}
                        </svg>
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Danh sách nhân viên
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="mt-5 hover:underline">
                    <Link href="/add-staff">
                      <div className="flex justify-start items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-user-round-plus"
                        >
                          {" "}
                          <path d="M2 21a8 8 0 0 1 13.292-6" />{" "}
                          <circle cx={10} cy={8} r={5} /> <path d="M19 16v6" />{" "}
                          <path d="M22 19h-6" />{" "}
                        </svg>
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Thêm nhân viên
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="mt-5 hover:underline">
                    <Link href="/staff">
                      <div className="flex justify-start items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-user-round-plus"
                        >
                          {" "}
                          <path d="M2 21a8 8 0 0 1 13.292-6" />{" "}
                          <circle cx={10} cy={8} r={5} /> <path d="M19 16v6" />{" "}
                          <path d="M22 19h-6" />{" "}
                        </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-user-round-cog"
                  >
                    {" "}
                    <path d="M2 21a8 8 0 0 1 10.434-7.62" />{" "}
                    <circle cx={10} cy={8} r={5} />{" "}
                    <circle cx={18} cy={18} r={3} />{" "}
                    <path d="m19.5 14.3-.4.9" /> <path d="m16.9 20.8-.4.9" />{" "}
                    <path d="m21.7 19.5-.9-.4" /> <path d="m15.2 16.9-.9-.4" />{" "}
                    <path d="m21.7 16.5-.9.4" /> <path d="m15.2 19.1-.9.4" />{" "}
                    <path d="m19.5 21.7-.4-.9" /> <path d="m16.9 15.2-.4-.9" />{" "}
                  </svg>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-2">
                <ul>
                  <li className="mt-5">
                    <HoverCard>
                      <HoverCardTrigger className="hover:bg-accent-color-sub">
                        <Link href="/staff-list">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-user-check"
                          >
                            {" "}
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />{" "}
                            <circle cx={9} cy={7} r={4} />{" "}
                            <polyline points="16 11 18 13 22 9" />{" "}
                          </svg>
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-user-round-plus"
                          >
                            {" "}
                            <path d="M2 21a8 8 0 0 1 13.292-6" />{" "}
                            <circle cx={10} cy={8} r={5} />{" "}
                            <path d="M19 16v6" /> <path d="M22 19h-6" />{" "}
                          </svg>
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-user-pen"
                          >
                            {" "}
                            <path d="M11.5 15H7a4 4 0 0 0-4 4v2" />{" "}
                            <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />{" "}
                            <circle cx={10} cy={7} r={4} />{" "}
                          </svg>
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
