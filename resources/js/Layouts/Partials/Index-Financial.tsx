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
interface IndexFinancialProps {
  isExpanded: boolean;
}

const IndexFinancial = ({ isExpanded }: IndexFinancialProps) => {
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
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chart-column"
                  >
                    {" "}
                    <path d="M3 3v16a2 2 0 0 0 2 2h16" /> <path d="M18 17V9" />{" "}
                    <path d="M13 17V5" /> <path d="M8 17v-3" />{" "}
                  </svg>
                  <span className="ml-4 text-xs whitespace-nowrap">
                    Chỉ số tài chính
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-2">
                <ul>
                  <li className="mt-5 hover:underline">
                    <Link href="/growth">
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
                          className="lucide lucide-chart-no-axes-combined"
                        >
                          {" "}
                          <path d="M12 16v5" /> <path d="M16 14v7" />{" "}
                          <path d="M20 10v11" />{" "}
                          <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />{" "}
                          <path d="M4 18v3" /> <path d="M8 14v7" />{" "}
                        </svg>
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Chỉ số tăng trưởng
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="mt-5 hover:underline">
                    <Link href="/information-index">
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
                          className="lucide lucide-chart-column-stacked"
                        >
                          {" "}
                          <path d="M11 13H7" /> <path d="M19 9h-4" />{" "}
                          <path d="M3 3v16a2 2 0 0 0 2 2h16" />{" "}
                          <rect x={15} y={5} width={4} height={12} rx={1} />{" "}
                          <rect x={7} y={8} width={4} height={9} rx={1} />{" "}
                        </svg>
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Thông tin chỉ số tài chính
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
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chart-column"
                  >
                    {" "}
                    <path d="M3 3v16a2 2 0 0 0 2 2h16" /> <path d="M18 17V9" />{" "}
                    <path d="M13 17V5" /> <path d="M8 17v-3" />{" "}
                  </svg>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-2">
                <ul>
                  <li className="mt-5">
                    <HoverCard>
                      <HoverCardTrigger className="hover:bg-accent-color-sub">
                        <Link href="/growth">
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
                            className="lucide lucide-chart-no-axes-combined"
                          >
                            {" "}
                            <path d="M12 16v5" /> <path d="M16 14v7" />{" "}
                            <path d="M20 10v11" />{" "}
                            <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />{" "}
                            <path d="M4 18v3" /> <path d="M8 14v7" />{" "}
                          </svg>
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent side="right" align="start">
                        chỉ số tăng trưởng
                      </HoverCardContent>
                    </HoverCard>
                  </li>
                  <li className="mt-5">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Link href="/information-index">
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
                            className="lucide lucide-chart-column-stacked"
                          >
                            {" "}
                            <path d="M11 13H7" /> <path d="M19 9h-4" />{" "}
                            <path d="M3 3v16a2 2 0 0 0 2 2h16" />{" "}
                            <rect x={15} y={5} width={4} height={12} rx={1} />{" "}
                            <rect x={7} y={8} width={4} height={9} rx={1} />{" "}
                          </svg>
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent side="right" align="start">
                        Thông tin chỉ số tài chính
                      </HoverCardContent>
                    </HoverCard>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </li>
  );
};

export default IndexFinancial;
