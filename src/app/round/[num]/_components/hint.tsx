"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HINTS_URL } from "@/constants/links";

export default function Hint({ hint }: { hint: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <span
        className="flex items-center gap-x-1 text-sm font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Hint</span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </span>
      {isOpen && (
        <div className="text-sm text-muted-foreground">
          <p>{hint}</p>
          <p>
            <a href={HINTS_URL} target="_blank" className="text-blue-500 hover:underline">
              ( see more data )
            </a>
          </p>
        </div>
      )}
    </>
  );
}
