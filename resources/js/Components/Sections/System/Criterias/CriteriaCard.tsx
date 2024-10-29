import { SheetWrapper } from "@/Components/Specialized/sheet-wrapper";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/UI/accordion";
import { Badge } from "@/Components/UI/badge";
import { FilePenLine } from "lucide-react";

const CriteriaCard = ({ id, name, group, slug }: Criteria) => {
  const totalClusters = group.length;
  const totalIndicators = group.reduce(
    (acc, cluster) => cluster.metrics.length + acc,
    0,
  );

  return (
    <AccordionItem
      value={`item-${id}`}
      className="shadow-md border rounded-md group"
    >
      <AccordionTrigger className="p-6 hover:no-underline !outline-none">
        <div className="flex flex-1 justify-between">
          {/* LEFT BLOCK */}
          <div className="flex flex-col gap-3 [&_*]:transition-all [&_*]:duration-100 [&_*]:ease-out">
            {/* LEFT BLOCK - TITLE */}
            <div className="group-[:not(:has([data-state=open]))]/criterias:group-hover:[&_*]:text-text-active [&>*]:group-data-[state=open]:text-text-active flex items-center gap-3 transition-colors duration-300 ease-out">
              <h3 className="font-bold text-slate-700 text-xl">{name}</h3>
              <p className="text-slate-700 text-sm text-opacity-65">{slug}</p>
            </div>
            {/* LEFT BLOCK - BADGES */}
            <div className="flex gap-2 group-[:not(:has([data-state=open]))]/criterias:group-hover:[&>*]:bg-text-active group-[:not(:has([data-state=open]))]/criterias:group-hover:[&>*]:text-white [&>*]:group-data-[state=open]:text-white [&>*]:group-data-[state=open]:bg-text-active ">
              <Badge variant="secondary" className="!bg-opacity-60">
                {totalClusters} nhóm
              </Badge>
              <Badge variant="secondary" className="!bg-opacity-60">
                {totalIndicators} chỉ số
              </Badge>
            </div>
          </div>

          <div className="flex gap-2 pe-3">
            <SheetWrapper
              title="Chỉnh sửa thông tin tiêu chí"
              trigger={
                <button className="flex items-center gap-2 !bg-blue-400 px-3 py-2 rounded-md h-fit font-md !text-white">
                  Chỉnh sửa <FilePenLine className="!stroke-white size-4" />
                </button>
              }
              description={name}
            >
              vjp
            </SheetWrapper>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-6 pt-0">
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
  );
};

export default CriteriaCard;
