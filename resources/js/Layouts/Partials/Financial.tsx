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
import { ChartSpline, Clipboard } from "lucide-react";
interface FinancialLiProps {
  isExpanded: boolean;
}

const FinancialLi = ({ isExpanded }: FinancialLiProps) => {
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
                  <ChartSpline className="size-5" />
                  <span className="ml-4 text-xs whitespace-nowrap">
                    Báo cáo tài chính
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-2">
                <ul>
                  <li className="mt-5 hover:underline">
                    <Link href="/financial">
                      <div className="flex justify-start items-center">
                        <Clipboard className="size-5" />
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Hồ sơ báo cáo
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
                  <ChartSpline />
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-2">
                <ul>
                  <li className="mt-5">
                    <HoverCard>
                      <HoverCardTrigger className="hover:bg-accent-color-sub">
                        <Link href="/staff-list">
                          <Clipboard className="size-5" />
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent side="right" align="start">
                        Hồ sơ báo cáo
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

export default FinancialLi;
