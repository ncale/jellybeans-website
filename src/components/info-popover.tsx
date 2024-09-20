"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";

export default function InfoPopover({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Info className="h-3 w-3 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="text-sm">
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </PopoverContent>
    </Popover>
  );
}
