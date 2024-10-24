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
import { ListCheck, ListStart, ListX, ShoppingBag } from "lucide-react";
interface BillLiProps {
  isExpanded: boolean;
}

const BillLi = ({ isExpanded }: BillLiProps) => {
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
                  <ShoppingBag />

                  <span className="ml-4 text-xs whitespace-nowrap">
                    Hóa đơn khách hàng
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-2">
                <ul>
                  <li className="mt-5 hover:underline">
                    <Link href="/bill-list">
                      <div className="flex justify-start items-center">
                        <ListStart />
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Danh sách hóa đơn
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="mt-5 hover:underline">
                    <Link href="/check-bill">
                      <div className="flex justify-start items-center">
                        <ListCheck />
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Xác nhân hóa đơn
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="mt-5 hover:underline">
                    <Link href="/bill-cancel">
                      <div className="flex justify-start items-center">
                        <ListX />
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Hóa đơn bị từ chối
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
                  <ShoppingBag />
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-2">
                <ul>
                  <li className="mt-5">
                    <HoverCard>
                      <HoverCardTrigger className="hover:bg-accent-color-sub">
                        <Link href="/staff-list">
                          <ListStart />
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent side="right" align="start">
                        Danh sách Hóa đơn
                      </HoverCardContent>
                    </HoverCard>
                  </li>
                  <li className="mt-5">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Link href="/add-staff">
                          <ListCheck />
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent side="right" align="start">
                        Xác nhận hóa đơn
                      </HoverCardContent>
                    </HoverCard>
                  </li>
                  <li className="mt-5">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Link href="/add-staff">
                          <ListX />
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent side="right" align="start">
                        Hóa đơn bị từ chối
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

export default BillLi;
