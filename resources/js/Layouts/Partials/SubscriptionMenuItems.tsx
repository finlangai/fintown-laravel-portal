import { cn } from "@/Lib/utils";
import { Link } from "@inertiajs/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { HandCoins, SquarePercent } from "lucide-react";

interface SubscriptionMenuItemsProps {
  isExpanded: boolean;
}

const SubscriptionMenuItems = ({ isExpanded }: SubscriptionMenuItemsProps) => {
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
                <HandCoins className="size-6" />
                {isExpanded && (
                  <span className="ml-4 text-xs whitespace-nowrap">
                    Gói đăng ký
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="ml-2">
              <ul>
                <li className="mt-5 hover:underline">
                  <Link href={route("subscription.programs.index")}>
                    <div className="flex justify-start items-center">
                      <SquarePercent className="size-6" />
                      {isExpanded && (
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Thông tin gói
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

export default SubscriptionMenuItems;
