"use client";

import { type PreviousRoundData } from "@/lib/types";
import Pagination from "../_components/pagination";
import Details from "../_components/details";

import { TOTAL_PAGES } from "@/constants/data";

export default function PreviousRoundPage({ data }: { data: PreviousRoundData }) {
  return (
    <>
      <section className="hidden w-1/2 p-2 md:block">
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
      </section>
    </>
  );
}
