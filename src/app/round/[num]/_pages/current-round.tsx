"use client";

import { CurrentRoundData } from "@/lib/types";
import Details from "../_components/details";
import Pagination from "../_components/pagination";
import Submit from "../_components/submit";

export default function CurrentRoundPage({ data }: { data: CurrentRoundData }) {
  return (
    <>
      <section className="w-1/2 bg-green-50 p-2">picture</section>
      <section className="w-1/2 space-y-8 p-2">
        <Pagination currentPage={data.round} />
        <Details
          question={data.question}
          potAmount={data.potAmount}
          submissionDeadline={data.submissionDeadline}
        />
        <Submit round={data.round} feeAmount={data.feeAmount} />
        {/* <LeaderboardTable /> */}
      </section>
    </>
  );
}
