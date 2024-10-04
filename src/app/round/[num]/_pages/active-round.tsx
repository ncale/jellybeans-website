"use client";

import SectionHeader from "../_components/section-header";
import Submit from "../_components/submit";
import YourSubmissions from "../_components/your-submissions";

import { type ActiveRoundData } from "@/lib/types";
import CountdownText from "../_components/countdown-text";
import { formatUnits } from "viem";
import { AmountUSD } from "@/components/amount-usd";
import Hint from "../_components/hint";

export default function ActiveRoundPage({ data }: { data: ActiveRoundData }) {
  return (
    <>
      <div>
        <SectionHeader
          text="Question"
          // infoText={"The data is evaluated according to ithout going over"}
        />
        <p className="text-xl font-semibold">{data.question}</p>
      </div>

      <div className="space-y-1">
        <SectionHeader
          text="Submit a Prediction"
          // infoText={
          //   "Winners are payed out per submission, meaning if you make 5 submissions and 3 win, you win 3 prizes\n- - -\nAlso! Receive 1 NFT per submission 🥳"
          // }
        />
        <Submit
          round={data.id}
          feeAmount={data.feeAmount}
          submissionDeadline={data.submissionDeadline}
        />
      </div>

      <div>{data.hint && <Hint hint={data.hint} />}</div>

      <div className="flex">
        <div className="min-w-48">
          <SectionHeader text="Pot" light />
          <p className="text-xl font-semibold">
            {formatUnits(data.potAmount, data.decimals)} OP{" "}
            <AmountUSD amount={Number(data.potAmount) / 10 ** 18} token="op" />
          </p>
        </div>

        <div>
          <SectionHeader text="Time left" light />
          <p className="text-xl font-semibold">
            <CountdownText timestamp={data.submissionDeadline} />
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="min-w-48">
          <SectionHeader text="Winners" infoText={data.payoutDetails} light />
          <p className="text-xl font-semibold">{data.numWinners}</p>
        </div>

        <div>
          <SectionHeader text="Submissions" light />
          <p className="text-xl font-semibold">{data.submissionCount}</p>
        </div>
      </div>

      <div className="space-y-1">
        <SectionHeader text="Your Submissions" />
        <YourSubmissions round={data.id} />
      </div>
    </>
  );
}
