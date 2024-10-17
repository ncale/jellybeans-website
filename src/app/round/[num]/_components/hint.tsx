"use client";

import { DUNE_SUBMISSIONS_URL } from "@/constants/links";

export default function Hint({ round, hint }: { round: number; hint: string }) {
  return (
    <>
      <p className="text-sm font-medium">Hint</p>
      <p className="text-sm text-muted-foreground">{hint}</p>
      <p className="text-sm">
        <a
          href={DUNE_SUBMISSIONS_URL + `round-${round.toString().padStart(2, "0")}-hint`}
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          ( see more data )
        </a>
      </p>
    </>
  );
}
