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
import { ChartNoAxesGantt, NotebookText, NotepadText, UserCheck, UserPen, UserRoundCog, UserRoundPlus, UsersRound } from "lucide-react";

interface StaffLiProps {
  isExpanded: boolean;
}

const Recipe = ({ isExpanded }: StaffLiProps) => {
  return (
   <li className="p-2 ml-2 text-text-head cursor-pointer rounded-xl  transition duration-300 hover:bg-accent-color ">
                     <div className="flex items-center">
                        {isExpanded ? (
                           <Accordion type="single" collapsible>
                           <AccordionItem value="item-2" className="border-none transition-none hover:text-white">
                             <AccordionTrigger>
                                 <div className="flex justify-center items-center">
                                    <NotepadText />
                                    <span className="whitespace-nowrap ml-4 text-xs">Quản lí Công thức</span>
                                 </div>
                             </AccordionTrigger>
                                 <AccordionContent className="ml-2">
                                    <ul>
                                       <li className="mt-5 hover:underline">
                                          <Link href="/Recipe/Technical-indicators">
                                             <div className="flex justify-start items-center">
                                                <NotebookText />
                                                <span className="whitespace-nowrap ml-2 text-xs">Chỉ số kĩ thuật</span>
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
                                          <NotepadText />
                                    </div>
                                 </AccordionTrigger>
                                 <AccordionContent className="ml-2">
                                       <ul>
                                          <li className="mt-5">
                                             <HoverCard>
                                                <HoverCardTrigger className="hover:bg-accent-color-sub">
                                                   <Link href="/Recipe/Technical-indicators">
                                                      <NotebookText />
                                                   </Link>
                                                </HoverCardTrigger>
                                                <HoverCardContent side="right"  align="start" >
                                                    Công thức tài chính
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

export default Recipe;
