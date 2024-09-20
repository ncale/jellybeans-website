"use client";

import InfoPopover from "@/components/info-popover";
import { ROUND_RESOURCES_URL } from "@/constants/links";
import { useCountdown, useCountdownPassed } from "@/lib/hooks";
import { ActiveRoundData } from "@/lib/types";
import { formatSeconds } from "@/lib/utils";
import { formatUnits } from "viem";

export default function ActiveRoundDetails({ data }: { data: ActiveRoundData }) {
  const isSubmissionPassed = useCountdownPassed(data.submissionDeadline);
  return (
    <div className="space-y-4">
      <div className="flex">
        <div className="min-w-32">
          <h4 className="flex items-center gap-x-1 text-sm text-muted-foreground">
            <span>Pot</span>
            {data.payoutDetails && <InfoPopover text={data.payoutDetails} />}
          </h4>
          <p className="text-xl font-semibold">{formatUnits(data.potAmount, data.decimals)}</p>
        </div>
        <div>
          <h4 className="text-sm text-muted-foreground">
            {"Round submissions"}
            {isSubmissionPassed ? "" : " end in"}
          </h4>
          <p className="text-xl font-semibold">
            <CountdownText timestamp={data.submissionDeadline} />
          </p>
        </div>
      </div>
      <p className="text-xl font-semibold">{data.question}</p>
      <p>
        <a
          href={ROUND_RESOURCES_URL}
          target="_blank"
          className="cursor-pointer text-sm font-semibold text-blue-700 hover:underline"
        >
          ( View historical data )
        </a>
      </p>
    </div>
  );
}

function CountdownText({ timestamp }: { timestamp: bigint }) {
  const { timeLeft } = useCountdown(timestamp);
  const timeString = formatSeconds(timeLeft);
  return timeString === "0s" ? "Closed" : timeString;
}
