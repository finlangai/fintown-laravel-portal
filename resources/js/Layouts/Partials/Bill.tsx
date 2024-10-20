import { Link } from "@inertiajs/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
interface BillLiProps {
  isExpanded: boolean;
}

const BillLi = ({ isExpanded }: BillLiProps) => {
  return (
   <li className="p-2 ml-2 text-text-head cursor-pointer rounded-xl  transition duration-300 hover:bg-accent-color ">
   <div className="flex items-center">
      {isExpanded ? (
         <Accordion type="single" collapsible>
         <AccordionItem value="item-2" className="border-none transition-none hover:text-white">
           <AccordionTrigger>
               <div className="flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag" > <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /> <path d="M3 6h18" /> <path d="M16 10a4 4 0 0 1-8 0" /> </svg>

                  <span className="whitespace-nowrap ml-4 text-xs">Hóa đơn khách hàng</span>
               </div>
           </AccordionTrigger>
               <AccordionContent className="ml-2">
                  <ul>
                     <li className="mt-5 hover:underline">
                        <Link href="/bill-list">
                           <div className="flex justify-start items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-start" > <path d="M16 12H3" /> <path d="M16 18H3" /> <path d="M10 6H3" /> <path d="M21 18V8a2 2 0 0 0-2-2h-5" /> <path d="m16 8-2-2 2-2" /> </svg>
                              <span className="whitespace-nowrap ml-2 text-xs">Danh sách hóa đơn</span>
                           </div>
                        </Link>
                     </li>
                     <li className="mt-5 hover:underline">
                        <Link href="/check-bill">
                           <div className="flex justify-start items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-check" > <path d="M11 18H3" /> <path d="m15 18 2 2 4-4" /> <path d="M16 12H3" /> <path d="M16 6H3" /> </svg>
                              <span className="whitespace-nowrap ml-2 text-xs">Xác nhân hóa đơn</span>
                           </div>
                        </Link>
                     </li>
                     <li className="mt-5 hover:underline">
                        <Link href="/bill-cancel">
                           <div className="flex justify-start items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-x" > <path d="M11 12H3" /> <path d="M16 6H3" /> <path d="M16 18H3" /> <path d="m19 10-4 4" /> <path d="m15 10 4 4" /> </svg>
                              <span className="whitespace-nowrap ml-2 text-xs">Hóa đơn bị từ chối</span>
                           </div>
                        </Link>
                     </li>
                  </ul>
               </AccordionContent>
         </AccordionItem>
       </Accordion>
      ) : (
         <Accordion type="single" collapsible defaultValue="item-2">
            <AccordionItem value="item-2"  className="border-none  transition-none hover:text-white">
               <AccordionTrigger>
                  <div className="relative inline-block">                              
                     <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag" > <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /> <path d="M3 6h18" /> <path d="M16 10a4 4 0 0 1-8 0" /> </svg>
                  </div>
               </AccordionTrigger>
               <AccordionContent className="ml-2">
                     <ul>
                        <li className="mt-5">
                           <HoverCard>
                              <HoverCardTrigger className="hover:bg-accent-color-sub">
                                 <Link href="/staff-list">
                                 <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-start" > <path d="M16 12H3" /> <path d="M16 18H3" /> <path d="M10 6H3" /> <path d="M21 18V8a2 2 0 0 0-2-2h-5" /> <path d="m16 8-2-2 2-2" /> </svg>
                                 </Link>
                              </HoverCardTrigger>
                              <HoverCardContent side="right"  align="start" >
                                  Danh sách Hóa đơn
                              </HoverCardContent>
                           </HoverCard>
                        </li>
                        <li className="mt-5">
                           <HoverCard>
                              <HoverCardTrigger>
                                 <Link href="/add-staff">
                                 <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-check" > <path d="M11 18H3" /> <path d="m15 18 2 2 4-4" /> <path d="M16 12H3" /> <path d="M16 6H3" /> </svg>
                                 </Link>
                              </HoverCardTrigger>
                              <HoverCardContent  side="right"  align="start">
                                 Xác nhận hóa đơn
                              </HoverCardContent>
                           </HoverCard>
                        </li>
                        <li className="mt-5">
                           <HoverCard>
                              <HoverCardTrigger>
                                 <Link href="/add-staff">
                                 <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-x" > <path d="M11 12H3" /> <path d="M16 6H3" /> <path d="M16 18H3" /> <path d="m19 10-4 4" /> <path d="m15 10 4 4" /> </svg>
                                 </Link>
                              </HoverCardTrigger>
                              <HoverCardContent  side="right"  align="start">
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

