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

type AddIndicatorProps = {
  trigger: React.ReactNode;
  indicators: CompactIndicator[];
  appendIndicator: (identifier: string) => void;
};
export const AddIndicator: React.FC<AddIndicatorProps> = ({
  trigger,
  indicators,
  appendIndicator,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
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
