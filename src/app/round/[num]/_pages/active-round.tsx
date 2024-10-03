"use client";

import SectionHeader from "../_components/section-header";
import Submit from "../_components/submit";
import YourSubmissions from "../_components/your-submissions";

import { type ActiveRoundData } from "@/lib/types";
import CountdownText from "../_components/countdown-text";
import { formatUnits } from "viem";
import { AmountUSD } from "@/components/amount-usd";

export default function ActiveRoundPage({ data }: { data: ActiveRoundData }) {
  return (
    <>
      <div>
        <SectionHeader text="Question" />
        <p className="text-xl font-semibold">{data.question}</p>
      </div>

      <div className="space-y-1">
        <SectionHeader
          text="Submit a Prediction"
          infoText={
            "Winners are payed out per submission, meaning if you make 5 submissions and 3 win, you win 3 prizes\n- - -\nAlso! Receive 1 NFT per submission 🥳"
          }
        />
        <Submit
          round={data.id}
          feeAmount={data.feeAmount}
          submissionDeadline={data.submissionDeadline}
        />
      </div>

      {/* <SectionHeader text="Hint" /> */}

      <br />

      <div className="flex">
        <div className="min-w-48">
          <SectionHeader text="Pot" infoText={data.payoutDetails} light />
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
          <SectionHeader text="Winners" light />
          <p className="text-xl font-semibold">{data.numWinners}</p>
        </div>

        <div>
          <SectionHeader text="Submissions" light />
          <p className="text-xl font-semibold">{data.submissionCount}</p>
        </div>
      </div>

      <br />

      <div>
        <SectionHeader text="Your Submissions" />
        <YourSubmissions round={data.id} />
      </div>
    </>
  );
}
