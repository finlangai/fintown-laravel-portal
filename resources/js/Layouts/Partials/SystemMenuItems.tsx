import { cn } from "@/Lib/utils";
import { Link } from "@inertiajs/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { BrainCircuit, CalendarCog, Cog, SquareRadical } from "lucide-react";

interface SystemMenuItemsProps {
  isExpanded: boolean;
}

const SystemMenuItems = ({ isExpanded }: SystemMenuItemsProps) => {
  return (
    <li
      className={cn(
        "hover:bg-accent-color ml-2 p-2 rounded-xl text-text-head hover:text-white transition duration-300 cursor-pointer",
        !isExpanded && "w-fit",
      )}
    >
      <div className="flex items-center">
        <Accordion className="flex-1" type="single" collapsible>
          <AccordionItem value="item-2" className="border-none transition-none">
            <AccordionTrigger className="flex items-center w-full">
              <div className="flex justify-center items-center">
                <Cog className="size-6" />
                {isExpanded && (
                  <span className="ml-4 text-xs whitespace-nowrap">
                    Hệ thống
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="ml-2">
              <ul>
                {/* Công thức */}
                <li className="mt-5 hover:underline">
                  <Link href="/add-staff">
                    <div className="flex justify-start items-center">
                      <SquareRadical className="size-6" />
                      {isExpanded && (
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Công thức
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
                {/* Backjobs */}
                <li className="mt-5 hover:underline">
                  <Link href={route("system.backjobs.index")}>
                    <div className="flex justify-start items-center">
                      <CalendarCog className="size-6" />
                      {isExpanded && (
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Backjobs
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
                {/* Criterias */}
                <li className="mt-5 hover:underline">
                  <Link href={route("system.criterias.index")}>
                    <div className="flex justify-start items-center">
                      <BrainCircuit className="size-6" />
                      {isExpanded && (
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Tiêu chí
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </li>
  );
};

export default SystemMenuItems;
