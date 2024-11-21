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
import { Factory } from "lucide-react";
interface CompanyLiProps {
  isExpanded: boolean;
}

const CompanyLi = ({ isExpanded }: CompanyLiProps) => {
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
                  <Factory />
                  <span className="ml-4 text-xs whitespace-nowrap">
                    Hồ sơ công ty
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-2">
                <ul>
                  <li className="mt-5 hover:underline">
                    <Link href="/company">
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
                          className="lucide lucide-clipboard"
                        >
                          {" "}
                          <rect
                            width={8}
                            height={4}
                            x={8}
                            y={2}
                            rx={1}
                            ry={1}
                          />{" "}
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />{" "}
                        </svg>
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Danh sách công ty
                        </span>
                      </div>
                    </Link>
                  </li>

                  {/* <li className="mt-5 hover:underline">
                    <Link href="/edit-company">
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
                          className="lucide lucide-highlighter"
                        >
                          {" "}
                          <path d="m9 11-6 6v3h9l3-3" />{" "}
                          <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />{" "}
                        </svg>

                        <span className="ml-2 text-xs whitespace-nowrap">
                          Chỉnh sửa hồ sơ
                        </span>
                      </div>
                    </Link>
                  </li> */}
                  {/* <li className="mt-5 hover:underline">
                    <Link href="/holder-list">
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
                          className="lucide lucide-building"
                        >
                          {" "}
                          <rect
                            width={16}
                            height={20}
                            x={4}
                            y={2}
                            rx={2}
                            ry={2}
                          />{" "}
                          <path d="M9 22v-4h6v4" /> <path d="M8 6h.01" />{" "}
                          <path d="M16 6h.01" /> <path d="M12 6h.01" />{" "}
                          <path d="M12 10h.01" /> <path d="M12 14h.01" />{" "}
                          <path d="M16 10h.01" /> <path d="M16 14h.01" />{" "}
                          <path d="M8 10h.01" /> <path d="M8 14h.01" />{" "}
                        </svg>
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Danh sách cổ đông
                        </span>
                      </div>
                    </Link>
                  </li> */}
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
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-factory"
                  >
                    {" "}
                    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />{" "}
                    <path d="M17 18h1" /> <path d="M12 18h1" />{" "}
                    <path d="M7 18h1" />{" "}
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
                            className="lucide lucide-clipboard"
                          >
                            {" "}
                            <rect
                              width={8}
                              height={4}
                              x={8}
                              y={2}
                              rx={1}
                              ry={1}
                            />{" "}
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />{" "}
                          </svg>
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent side="right" align="start">
                        Danh sách công ty
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
                            className="lucide lucide-highlighter"
                          >
                            {" "}
                            <path d="m9 11-6 6v3h9l3-3" />{" "}
                            <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />{" "}
                          </svg>
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent side="right" align="start">
                        Chỉnh sửa hồ sơ
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
                            className="lucide lucide-building"
                          >
                            {" "}
                            <rect
                              width={16}
                              height={20}
                              x={4}
                              y={2}
                              rx={2}
                              ry={2}
                            />{" "}
                            <path d="M9 22v-4h6v4" /> <path d="M8 6h.01" />{" "}
                            <path d="M16 6h.01" /> <path d="M12 6h.01" />{" "}
                            <path d="M12 10h.01" /> <path d="M12 14h.01" />{" "}
                            <path d="M16 10h.01" /> <path d="M16 14h.01" />{" "}
                            <path d="M8 10h.01" /> <path d="M8 14h.01" />{" "}
                          </svg>
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent side="right" align="start">
                        Chỉnh sửa bài viết
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

export default CompanyLi;
