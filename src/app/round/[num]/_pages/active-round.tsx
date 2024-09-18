"use client";

import Details from "../_components/details";
import Pagination from "../_components/pagination";
import Submit from "../_components/submit";
import YourSubmissions from "../_components/your-submissions";
import RecentSubmissions from "../_components/recent-submissions";

import { TOTAL_PAGES } from "@/constants/data";
import { type ActiveRoundData } from "@/lib/types";

export default function ActiveRoundPage({ data }: { data: ActiveRoundData }) {
  return (
    <>
      <section className="flex gap-x-2">
        <section className="hidden aspect-square w-1/2 p-2 md:block">
          <div className="h-full w-full border bg-red-50" />
        </section>
        <section className="p-2 md:w-1/2">
          <div className="mb-9 space-y-4">
            <Pagination currentPage={data.id} totalPages={TOTAL_PAGES} />
            <Details
              question={data.question}
              potAmount={data.potAmount}
              submissionDeadline={data.submissionDeadline}
            />
          </div>
          <Submit
            round={data.id}
            feeAmount={data.feeAmount}
            submissionDeadline={data.submissionDeadline}
          />
          <YourSubmissions round={data.id} />
        </section>
      </section>
      <section className="mt-12">
        <RecentSubmissions round={data.id} />
      </section>
    </>
  );
}
