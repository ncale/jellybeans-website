"use client";

import SectionHeader from "../_components/section-header";
import Submit from "../_components/submit";
// import YourSubmissions from "../_components/your-submissions";
import CountdownText from "../_components/countdown-text";
import Hint from "../_components/hint";
import { AmountUSD } from "@/components/amount-usd";

import { formatUnits } from "viem";
import { type ActiveRoundData } from "@/lib/types";

export default function ActiveRoundPage({ data }: { data: ActiveRoundData }) {
  return (
    <>
      <div>
        <SectionHeader text="Question" />
        <p className="text-xl font-semibold">{data.question}</p>
      </div>

      <div className="space-y-1">
        <SectionHeader text="Submit a Prediction" />
        <Submit
          round={data.id}
          feeAmount={data.feeAmount}
          submissionDeadline={data.submissionDeadline}
        />
      </div>

      <div>{data.hint && <Hint round={data.id} hint={data.hint} />}</div>

      <div className="flex">
        <div className="min-w-48">
          <SectionHeader text="Pot" light />
          <p className="text-xl font-semibold">
            {formatUnits(data.potAmount, data.decimals)} OP (
            <AmountUSD amount={Number(data.potAmount) / 10 ** 18} token="op" />)
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

      {/* <div className="space-y-1">
        <SectionHeader text="Your Submissions" />
        <YourSubmissions round={data.id} />
      </div> */}
    </>
  );
}
