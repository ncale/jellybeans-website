"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCountdown, useCountdownPassed } from "@/lib/hooks";
import { formatSeconds } from "@/lib/utils";
import { Info } from "lucide-react";
import { formatUnits } from "viem";

export default function Details({
  question,
  payoutDetails,
  potAmount,
  submissionDeadline,
}: {
  question: string;
  payoutDetails?: string;
  potAmount: bigint;
  submissionDeadline: bigint;
}) {
  const isSubmissionPassed = useCountdownPassed(submissionDeadline);
  return (
    <div className="space-y-4">
      <div className="flex">
        <div className="min-w-32">
          <h4 className="flex items-center gap-x-1 text-sm text-muted-foreground">
            <span>Pot</span>
            {payoutDetails && <InfoPopover text={payoutDetails} />}
          </h4>
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
  const timeString = formatSeconds(timeLeft);
  return timeString === "0s" ? "Closed" : timeString;
}

function InfoPopover({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Info className="h-3 w-3" />
      </PopoverTrigger>
      <PopoverContent>
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </PopoverContent>
    </Popover>
  );
}
