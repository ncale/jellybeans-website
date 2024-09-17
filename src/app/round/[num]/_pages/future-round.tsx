"use client";

import { type FutureRoundData } from "@/lib/types";
import Pagination from "../_components/pagination";

import { TOTAL_PAGES } from "@/constants/data";

export default function FutureRoundPage({ data }: { data: FutureRoundData }) {
  return (
    <>
      <section className="w-1/2 p-2">
        <div className="h-full w-full bg-red-50" />
      </section>
      <section className="w-1/2 space-y-9 p-2">
        <div className="space-y-4">
          <Pagination currentPage={data.round} totalPages={TOTAL_PAGES} />
        </div>
      </section>
    </>
  );
}
