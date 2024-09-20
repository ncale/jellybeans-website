"use client";

import Pagination from "../_components/pagination";
import PastRoundDetails from "../_components/past-round-details";
import WinnersTable from "../_components/winners-table";
import YourSubmissions from "../_components/your-submissions";
import RecentSubmissions from "../_components/recent-submissions";

import { type PastRoundData } from "@/lib/types";
import Image from "next/image";
import { FALLBACK_IMAGE_URL } from "@/constants/data";

export default function PastRoundPage({ data }: { data: PastRoundData }) {
  return (
    <>
      <section className="flex gap-x-2">
        <section className="hidden w-1/2 p-2 md:block">
          <Image
            src={FALLBACK_IMAGE_URL}
            alt="asdf"
            className="aspect-square w-full rounded border-4 border-muted-foreground"
            width={500}
            height={500}
          />
        </section>
        <section className="space-y-9 p-2 md:w-1/2">
          <div className="space-y-4">
            <Pagination currentPage={data.id} />
            <PastRoundDetails
              question={data.question}
              potAmount={data.potAmount}
              correctAnswer={data.correctAnswer}
            />
          </div>
          <WinnersTable data={data} />
          <YourSubmissions round={data.id} />
        </section>
      </section>
      <section className="mt-12">
        <RecentSubmissions round={data.id} />
      </section>
    </>
  );
}
