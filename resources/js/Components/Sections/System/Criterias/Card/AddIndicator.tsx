"use client";

import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/Components/UI/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/UI/popover";
import { Plus } from "lucide-react";

type AddIndicatorProps = {
  indicators: CompactIndicator[];
  appendIndicator: (identifier: string) => void;
};
export const AddIndicator: React.FC<AddIndicatorProps> = ({
  indicators,
  appendIndicator,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span className="flex items-center gap-1 border-slate-200 px-2 py-1 border rounded-sm font-bold text-green-400 text-xs cursor-pointer">
          <Plus className="size-3 stroke-[3px]" /> Thêm
        </span>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="right" align="start">
        <Command>
          <CommandInput placeholder="Tìm kiếm chỉ số..." />
          <CommandList>
            <CommandEmpty>Không có kết quả.</CommandEmpty>
            <CommandGroup>
              {indicators.map((indicatorInfo) => (
                <CommandItem
                  key={indicatorInfo.identifier}
                  value={indicatorInfo.identifier}
                  onSelect={(value: any) => {
                    appendIndicator(value);
                    setOpen(false);
                  }}
                >
                  {indicatorInfo.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
