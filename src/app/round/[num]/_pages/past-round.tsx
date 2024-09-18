"use client";

import Pagination from "../_components/pagination";
import PastRoundDetails from "../_components/past-round-details";
import WinnersTable from "../_components/winners-table";
import YourSubmissions from "../_components/your-submissions";
import RecentSubmissions from "../_components/recent-submissions";

import { TOTAL_PAGES } from "@/constants/data";
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
          <YourSubmissions round={data.id} />
        </section>
      </section>
      <section className="mt-12">
        <RecentSubmissions round={data.id} />
      </section>
    </>
  );
}
