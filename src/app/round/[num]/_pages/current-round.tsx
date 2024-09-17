"use client";

import { CurrentRoundData } from "@/lib/types";
import Details from "../_components/details";
import Pagination from "../_components/pagination";
import Submit from "../_components/submit";
import LeaderboardTable from "../_components/leaderboard-table";

export default function CurrentRoundPage({ data }: { data: CurrentRoundData }) {
  return (
    <>
      <section className="w-1/2 p-2">
        <div className="h-full w-full bg-red-50" />
      </section>
      <section className="w-1/2 space-y-9 p-2">
        <div className="space-y-4">
          <Pagination currentPage={data.round} />
          <Details
            question={data.question}
            potAmount={data.potAmount}
            submissionDeadline={data.submissionDeadline}
          />
        </div>
        <Submit round={data.round} feeAmount={data.feeAmount} />
        <LeaderboardTable round={data.round} />
      </section>
    </>
  );
}
