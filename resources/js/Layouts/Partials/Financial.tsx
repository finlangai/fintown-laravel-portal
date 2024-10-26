import { Link } from "@inertiajs/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
interface FinancialLiProps {
  isExpanded: boolean;
}

const FinancialLi = ({ isExpanded }: FinancialLiProps) => {
  return (
   <li className="p-2 ml-2 text-text-head cursor-pointer rounded-xl  transition duration-300 hover:bg-accent-color ">
   <div className="flex items-center">
      {isExpanded ? (
         <Accordion type="single" collapsible>
         <AccordionItem value="item-2" className="border-none transition-none hover:text-white">
           <AccordionTrigger>
               <div className="flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-spline" > <path d="M3 3v16a2 2 0 0 0 2 2h16" /> <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" /> </svg>
                  <span className="whitespace-nowrap ml-4 text-xs">Báo cáo tài chính</span>
               </div>
           </AccordionTrigger>
               <AccordionContent className="ml-2">
                  <ul>
                     <li className="mt-5 hover:underline">
                        <Link href="/financial">
                           <div className="flex justify-start items-center">
                               <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard" > <rect width={8} height={4} x={8} y={2} rx={1} ry={1} /> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /> </svg>
                              <span className="whitespace-nowrap ml-2 text-xs">Hồ sơ báo cáo</span>
                           </div>
                        </Link>
                     </li>
                    
                     <li className="mt-5 hover:underline">
                        <Link href="/edit-financial">
                           <div className="flex justify-start items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-pen" > <path d="M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5" /> <path d="M14 2v4a2 2 0 0 0 2 2h4" /> <path d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /> </svg>
                              <span className="whitespace-nowrap ml-2 text-xs">Chỉnh sửa hồ sơ</span>
                           </div>
                        </Link>
                     </li>
                     <li className="mt-5 hover:underline">
                        <Link href="/financial-year">
                           <div className="flex justify-start items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open-text" > <path d="M12 7v14" /> <path d="M16 12h2" /> <path d="M16 8h2" /> <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" /> <path d="M6 12h2" /> <path d="M6 8h2" /> </svg>
                              <span className="whitespace-nowrap ml-2 text-xs">Báo cáo tài chính theo năm</span>
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
                     <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-spline" > <path d="M3 3v16a2 2 0 0 0 2 2h16" /> <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" /> </svg>
                  </div>
               </AccordionTrigger>
               <AccordionContent className="ml-2">
                     <ul>
                        <li className="mt-5">
                           <HoverCard>
                              <HoverCardTrigger className="hover:bg-accent-color-sub">
                                 <Link href="/staff-list">
                                 <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard" > <rect width={8} height={4} x={8} y={2} rx={1} ry={1} /> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /> </svg>
                                 </Link>
                              </HoverCardTrigger>
                              <HoverCardContent side="right"  align="start" >
                                  Hồ sơ báo cáo
                              </HoverCardContent>
                           </HoverCard>
                        </li>
                        <li className="mt-5">
                           <HoverCard>
                              <HoverCardTrigger>
                                 <Link href="/add-staff">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-pen" > <path d="M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5" /> <path d="M14 2v4a2 2 0 0 0 2 2h4" /> <path d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /> </svg>
                                 </Link>
                              </HoverCardTrigger>
                              <HoverCardContent  side="right"  align="start">
                                 Chỉnh sửa hồ sơ
                              </HoverCardContent>
                           </HoverCard>
                        </li>
                        <li className="mt-5">
                           <HoverCard>
                              <HoverCardTrigger>
                                 <Link href="/add-staff">
                                 <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open-text" > <path d="M12 7v14" /> <path d="M16 12h2" /> <path d="M16 8h2" /> <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" /> <path d="M6 12h2" /> <path d="M6 8h2" /> </svg>
                                 </Link>
                              </HoverCardTrigger>
                              <HoverCardContent  side="right"  align="start">
                                 Báo cáo tài chính theo năm
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

export default FinancialLi;
