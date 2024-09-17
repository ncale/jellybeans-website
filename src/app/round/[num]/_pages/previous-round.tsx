"use client";

import { type PreviousRoundData } from "@/lib/types";
import Pagination from "../_components/pagination";
import PreviousRoundDetails from "../_components/previous-round-details";

import { TOTAL_PAGES } from "@/constants/data";
import LeaderboardTable from "../_components/leaderboard-table";

export default function PreviousRoundPage({ data }: { data: PreviousRoundData }) {
  return (
    <>
      <section className="mt-16 flex gap-x-2">
        <section className="hidden aspect-square w-1/2 p-2 md:block">
          <div className="h-full w-full bg-red-50" />
        </section>
        <section className="space-y-9 p-2 md:w-1/2">
          <div className="space-y-4">
            <Pagination currentPage={data.round} totalPages={TOTAL_PAGES} />
            <PreviousRoundDetails
              question={data.question}
              potAmount={data.potAmount}
              correctAnswer={data.correctAnswer}
            />
          </div>
        </section>
      </section>
      <section className="mt-16">
        <LeaderboardTable round={data.round} />
      </section>
    </>
  );
}
