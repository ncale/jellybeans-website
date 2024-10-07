"use client";

import { HINTS_URL } from "@/constants/links";

export default function Hint({ hint }: { hint: string }) {
  return (
    <>
      <p className="text-sm font-medium">Hint:</p>
      <p className="text-sm text-muted-foreground">{hint}</p>
      <p className="text-sm">
        <a href={HINTS_URL} target="_blank" className="text-blue-500 hover:underline">
          ( see more data )
        </a>
      </p>
    </>
  );
}
