"use client";

import { timeUntil } from "@/lib/utils";
import { useEffect, useState } from "react";
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
  return (
    <div className="space-y-2">
      <div className="flex">
        <div className="min-w-32">
          <h4 className="text-sm text-muted-foreground">Pot</h4>
          <p className="text-xl font-semibold">{formatUnits(potAmount, 0)}</p>
        </div>
        <div className="">
          <h4 className="text-sm text-muted-foreground">Round submissions end in</h4>
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
  const [, forceUpdate] = useState({});
  useEffect(() => {
    const intervalId = setInterval(() => forceUpdate({}), 1000);
    return () => clearInterval(intervalId);
  }, []);
  return timeUntil(timestamp);
}
