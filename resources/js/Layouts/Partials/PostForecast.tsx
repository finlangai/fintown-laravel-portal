import { Link } from "@inertiajs/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
interface PostforecastProps {
  isExpanded: boolean;
}

const Postforecast = ({ isExpanded }: PostforecastProps) => {
  return (
   <li className="p-2 ml-2 text-text-head cursor-pointer rounded-xl  transition duration-300 hover:bg-accent-color ">
   <div className="flex items-center">
      {isExpanded ? (
         <Accordion type="single" collapsible>
         <AccordionItem value="item-2" className="border-none transition-none hover:text-white">
           <AccordionTrigger>
               <div className="flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-type" > <rect width={8} height={4} x={8} y={2} rx={1} ry={1} /> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /> <path d="M9 12v-1h6v1" /> <path d="M11 17h2" /> <path d="M12 11v6" /> </svg>
                  <span className="whitespace-nowrap ml-4 text-xs">Bài viết dự đoán</span>
               </div>
           </AccordionTrigger>
               <AccordionContent className="ml-2">
                  <ul>
                     <li className="mt-5 hover:underline">
                        <Link href="/post-list">
                           <div className="flex justify-start items-center">
                               <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard" > <rect width={8} height={4} x={8} y={2} rx={1} ry={1} /> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /> </svg>
                              <span className="whitespace-nowrap ml-2 text-xs">Danh sách bài viết</span>
                           </div>
                        </Link>
                     </li>
                    
                     <li className="mt-5 hover:underline">
                        <Link href="/post-report">
                           <div className="flex justify-start items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-notebook-pen" > <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" /> <path d="M2 6h4" /> <path d="M2 10h4" /> <path d="M2 14h4" /> <path d="M2 18h4" /> <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /> </svg>
                              <span className="whitespace-nowrap ml-2 text-xs">Bài viết công bố</span>
                           </div>
                        </Link>
                     </li>
                     <li className="mt-5 hover:underline">
                        <Link href="/post-article">
                           <div className="flex justify-start items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line" > <path d="M12 20h9" /> <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" /> <path d="m15 5 3 3" /> </svg>
                              <span className="whitespace-nowrap ml-2 text-xs">Chỉnh sửa bài viết</span>
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
                     <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-type" > <rect width={8} height={4} x={8} y={2} rx={1} ry={1} /> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /> <path d="M9 12v-1h6v1" /> <path d="M11 17h2" /> <path d="M12 11v6" /> </svg>
                  </div>
               </AccordionTrigger>
               <AccordionContent className="ml-2">
                     <ul>
                        <li className="mt-5">
                           <HoverCard>
                              <HoverCardTrigger className="hover:bg-accent-color-sub">
                                 <Link href="/post-list">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard" > <rect width={8} height={4} x={8} y={2} rx={1} ry={1} /> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /> </svg>
                                 </Link>
                              </HoverCardTrigger>
                              <HoverCardContent side="right"  align="start" >
                                  Danh sách Bài viết
                              </HoverCardContent>
                           </HoverCard>
                        </li>
                        <li className="mt-5">
                           <HoverCard>
                              <HoverCardTrigger>
                                 <Link href="/post-report">
                                 <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-notebook-pen" > <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" /> <path d="M2 6h4" /> <path d="M2 10h4" /> <path d="M2 14h4" /> <path d="M2 18h4" /> <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /> </svg>
                                 </Link>
                              </HoverCardTrigger>
                              <HoverCardContent  side="right"  align="start">
                                 Bài viết công bố
                              </HoverCardContent>
                           </HoverCard>
                        </li>
                        <li className="mt-5">
                           <HoverCard>
                              <HoverCardTrigger>
                                 <Link href="/post-article">
                                 <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line" > <path d="M12 20h9" /> <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" /> <path d="m15 5 3 3" /> </svg>
                                 </Link>
                              </HoverCardTrigger>
                              <HoverCardContent  side="right"  align="start">
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

export default Postforecast;
