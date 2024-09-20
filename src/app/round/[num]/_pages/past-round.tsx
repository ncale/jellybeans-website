"use client";

import Pagination from "../_components/pagination";
import PastRoundDetails from "../_components/past-round-details";
import WinnersTable from "../_components/winners-table";
import YourSubmissions from "../_components/your-submissions";

import { type PastRoundData } from "@/lib/types";

export default function PastRoundPage({ data }: { data: PastRoundData }) {
  return (
    <>
      <div className="space-y-4">
        <Pagination currentPage={data.id} />
        <PastRoundDetails data={data} />
      </div>
      <WinnersTable data={data} />
      <YourSubmissions round={data.id} />
    </>
  );
}
