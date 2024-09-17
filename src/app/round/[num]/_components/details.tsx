"use client";

import { useCountdown, useCountdownPassed } from "@/lib/hooks";
import { formatSeconds } from "@/lib/utils";
import { formatUnits } from "viem";

export default function Details({
  question,
  potAmount,
  submissionDeadline,
}: {
  question: string;
  potAmount: bigint;
  submissionDeadline: bigint;
}) {
  const isSubmissionPassed = useCountdownPassed(submissionDeadline);
  return (
    <div className="space-y-4">
      <div className="flex">
        <div className="min-w-32">
          <h4 className="text-sm text-muted-foreground">Pot</h4>
          <p className="text-xl font-semibold">{formatUnits(potAmount, 0)}</p>
        </div>
        <div>
          <h4 className="text-sm text-muted-foreground">
            {"Round submissions"}
            {isSubmissionPassed ? "" : " end in"}
          </h4>
          <p className="text-xl font-semibold">
            <CountdownText timestamp={submissionDeadline} />
          </p>
        </div>
      </div>
      <p className="text-xl font-semibold">{question}</p>
    </div>
  );
}

function CountdownText({ timestamp }: { timestamp: bigint }) {
  const { timeLeft } = useCountdown(timestamp);
  return formatSeconds(timeLeft);
}
