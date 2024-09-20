"use client";

import { type PastRoundData } from "@/lib/types";
import { formatUnits } from "viem";

export default function PastRoundDetails({ data }: { data: PastRoundData }) {
  return (
    <div className="space-y-4">
      <div className="flex">
        <div className="min-w-32">
          <h4 className="text-sm text-muted-foreground">Pot</h4>
          <p className="text-xl font-semibold">{formatUnits(data.potAmount, data.decimals)}</p>
        </div>
        <div>
          <h4 className="text-sm text-muted-foreground">Answer</h4>
          <p className="text-xl font-semibold">{data.correctAnswer.toString()}</p>
        </div>
      </div>
      <p className="text-xl font-semibold">{data.question}</p>
    </div>
  );
}
