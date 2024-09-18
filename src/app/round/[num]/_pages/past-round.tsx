"use client";

import Pagination from "../_components/pagination";
import PastRoundDetails from "../_components/past-round-details";
import WinnersTable from "../_components/winners-table";
import LeaderboardTable from "../_components/leaderboard-table";

import { TOTAL_PAGES } from "@/constants/data";
import { Pill } from "@/components/ui/pill";
import { type PastRoundData } from "@/lib/types";

export default function PastRoundPage({ data }: { data: PastRoundData }) {
  return (
    <>
      <section className="flex gap-x-2">
        <section className="hidden aspect-square w-1/2 p-2 md:block">
          <div className="h-full w-full border bg-red-50" />
        </section>
        <section className="space-y-9 p-2 md:w-1/2">
          <div className="space-y-4">
            <Pagination currentPage={data.id} totalPages={TOTAL_PAGES} />
            <PastRoundDetails
              question={data.question}
              potAmount={data.potAmount}
              correctAnswer={data.correctAnswer}
            />
          </div>
          <WinnersTable round={data.id} />
          <div className="mt-4 space-y-1">
            <h3 className="font-medium">Your Submissions</h3>
            <div className="flex flex-wrap gap-1">
              <Pill variant="outline">n/a</Pill>
            </div>
          </div>
        </section>
      </section>
      <section className="mt-12">
        <LeaderboardTable round={data.id} />
      </section>
    </>
  );
}
