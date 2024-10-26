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
import {
  Clipboard,
  ClipboardType,
  NotebookPen,
  PencilLine,
} from "lucide-react";
interface PostforecastProps {
  isExpanded: boolean;
}

const Postforecast = ({ isExpanded }: PostforecastProps) => {
  return (
    <li className="hover:bg-accent-color ml-2 p-2 rounded-xl text-text-head transition duration-300 cursor-pointer">
      <div className="flex items-center">
        {isExpanded ? (
          <Accordion type="single" collapsible>
            <AccordionItem
              value="item-2"
              className="border-none hover:text-white transition-none"
            >
              <AccordionTrigger>
                <div className="flex justify-center items-center">
                  <ClipboardType />
                  <span className="ml-4 text-xs whitespace-nowrap">
                    Bài viết dự đoán
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-2">
                <ul>
                  <li className="mt-5 hover:underline">
                    <Link href="/post-list">
                      <div className="flex justify-start items-center">
                        <Clipboard />
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Danh sách bài viết
                        </span>
                      </div>
                    </Link>
                  </li>

                  <li className="mt-5 hover:underline">
                    <Link href="/post-report">
                      <div className="flex justify-start items-center">
                        <NotebookPen />
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Bài viết công bố
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="mt-5 hover:underline">
                    <Link href="/post-article">
                      <div className="flex justify-start items-center">
                        <PencilLine />
                        <span className="ml-2 text-xs whitespace-nowrap">
                          Chỉnh sửa bài viết
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
                  <ClipboardType />
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-2">
                <ul>
                  <li className="mt-5">
                    <HoverCard>
                      <HoverCardTrigger className="hover:bg-accent-color-sub">
                        <Link href="/post-list">
                          <Clipboard />
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent side="right" align="start">
                        Danh sách Bài viết
                      </HoverCardContent>
                    </HoverCard>
                  </li>
                  <li className="mt-5">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Link href="/post-report">
                          <NotebookPen />
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent side="right" align="start">
                        Bài viết công bố
                      </HoverCardContent>
                    </HoverCard>
                  </li>
                  <li className="mt-5">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Link href="/post-article">
                          <PencilLine />
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

export default Postforecast;
