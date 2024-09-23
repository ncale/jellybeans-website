"use client";

import InfoPopover from "@/components/info-popover";
import { ROUND_RESOURCES_URL } from "@/constants/links";
import { useCountdown } from "@/lib/hooks";
import { getOPPrice } from "@/lib/mobula";
import { ActiveRoundData } from "@/lib/types";
import { formatSeconds } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { formatUnits } from "viem";

export default function ActiveRoundDetails({ data }: { data: ActiveRoundData }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="flex items-center gap-x-1 text-sm text-muted-foreground">
          <span>Pot</span>
          {data.payoutDetails && <InfoPopover text={data.payoutDetails} />}
        </h4>
        <p className="text-xl font-semibold">
          {formatUnits(data.potAmount, data.decimals)}{" "}
          <AmountInUSDText amount={Number(data.potAmount) / 10 ** 18} />
        </p>
      </div>
      <div className="flex">
        <div className="min-w-32">
          <h4 className="flex items-center gap-x-1 text-sm text-muted-foreground">Submissions</h4>
          <p className="text-xl font-semibold">{data.submissionCount}</p>
        </div>
        <div>
          <h4 className="text-sm text-muted-foreground">Time left</h4>
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

function AmountInUSDText({ amount }: { amount: number }) {
  const {
    data: opPrice,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["op-price"],
    queryFn: () => getOPPrice(),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    gcTime: Infinity,
  });

  if (isLoading) return <>Loading...</>;
  if (!isSuccess) return <></>;

  return (
    <>
      (~$
      {(amount * opPrice?.data.price).toFixed(0)})
    </>
  );
}
