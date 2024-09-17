"use client";

import { CurrentRoundData } from "@/lib/types";
import Details from "../_components/details";
import Pagination from "../_components/pagination";
import Submit from "../_components/submit";
import LeaderboardTable from "../_components/leaderboard-table";

import { TOTAL_PAGES } from "@/constants/data";

export default function CurrentRoundPage({ data }: { data: CurrentRoundData }) {
  return (
    <>
      <section className="mt-16 flex gap-x-2">
        <section className="hidden aspect-square w-1/2 p-2 md:block">
          <div className="h-full w-full bg-red-50" />
        </section>
        <section className="space-y-9 p-2 md:w-1/2">
          <div className="space-y-4">
            <Pagination currentPage={data.round} totalPages={TOTAL_PAGES} />
            <Details
              question={data.question}
              potAmount={data.potAmount}
              submissionDeadline={data.submissionDeadline}
            />
          </div>
          <Submit
            round={data.round}
            feeAmount={data.feeAmount}
            submissionDeadline={data.submissionDeadline}
          />
        </section>
      </section>
      <section className="mt-16">
        <LeaderboardTable round={data.round} />
      </section>
    </>
  );
}
