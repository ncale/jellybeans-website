"use client";

import { formatUnits } from "viem";

export default function PreviousRoundDetails({
  question,
  potAmount,
  correctAnswer,
}: {
  question: string;
  potAmount: bigint;
  correctAnswer: bigint;
}) {
  return (
    <div className="space-y-4">
      <div className="flex">
        <div className="min-w-32">
          <h4 className="text-sm text-muted-foreground">Pot</h4>
          <p className="text-xl font-semibold">{formatUnits(potAmount, 0)}</p>
        </div>
        <div>
          <h4 className="text-sm text-muted-foreground">Answer</h4>
          <p className="text-xl font-semibold">{correctAnswer.toString()}</p>
        </div>
      </div>
      <p className="text-xl font-semibold">{question}</p>
    </div>
  );
}
