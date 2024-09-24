"use client";

import { ROUND_RESOURCES_URL } from "@/constants/links";
import { type PastRoundData } from "@/lib/types";
import { formatUnits } from "viem";

export default function PastRoundDetails({ data }: { data: PastRoundData }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm text-muted-foreground">Pot</h4>
        <p className="text-xl font-semibold">{formatUnits(data.potAmount, data.decimals)}</p>
      </div>
      <div className="flex gap-x-4">
        <div className="min-w-32">
          <h4 className="text-sm text-muted-foreground">Submissions</h4>
          <p className="text-xl font-semibold">{data.submissionCount}</p>
        </div>
        <div>
          <h4 className="text-sm text-muted-foreground">Answer</h4>
          <p className="text-xl font-semibold">{data.correctAnswer.toString()}</p>
        </div>
      </div>
      <p className="text-xl font-semibold">{data.question}</p>
      <p>
        <a
          href={ROUND_RESOURCES_URL}
          target="_blank"
          className="cursor-pointer text-sm font-semibold text-blue-700 hover:underline"
        >
          ( see recent data )
        </a>
      </p>
    </div>
  );
}
