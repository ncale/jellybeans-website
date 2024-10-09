"use client";

import Hint from "../_components/hint";
import SectionHeader from "../_components/section-header";
import WinnersTable from "../_components/winners-table";
// import YourSubmissions from "../_components/your-submissions";
import { AmountUSD } from "@/components/amount-usd";

import { formatUnits } from "viem";
import { type PastRoundData } from "@/lib/types";

export default function PastRoundPage({ data }: { data: PastRoundData }) {
  return (
    <>
      <div>
        <SectionHeader text="Question" />
        <p className="text-xl font-semibold">{data.question}</p>
      </div>

      <div>{data.hint && <Hint hint={data.hint} />}</div>

      <div className="flex">
        <div>
          <SectionHeader text="Pot" />
          <p className="text-xl font-semibold">
            {formatUnits(data.potAmount, data.decimals)}
            (<AmountUSD amount={Number(data.potAmount) / 10 ** 18} token="op" />)
          </p>
        </div>

        <div>
          <SectionHeader text="Answer" />
          <p className="text-xl font-semibold">{data.correctAnswer.toString()}</p>
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

      <WinnersTable data={data} />

      {/* <YourSubmissions round={data.id} /> */}
    </>
  );
}
