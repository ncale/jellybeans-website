"use client";

import { type FutureRoundData } from "@/lib/types";
import Pagination from "../_components/pagination";

import { TOTAL_PAGES } from "@/constants/data";

export default function FutureRoundPage({ data }: { data: FutureRoundData }) {
  return (
    <>
      <section className="mt-16 flex gap-x-2">
        <section className="hidden aspect-square w-1/2 p-2 md:block">
          <div className="h-full w-full bg-red-50" />
        </section>
        <section className="space-y-9 p-2 md:w-1/2">
          <div className="space-y-4">
            <Pagination currentPage={data.round} totalPages={TOTAL_PAGES} />
          </div>
        </section>
      </section>
    </>
  );
}
