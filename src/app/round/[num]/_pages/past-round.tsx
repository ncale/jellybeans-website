"use client";

import PastRoundDetails from "../_components/past-round-details";
import WinnersTable from "../_components/winners-table";
import YourSubmissions from "../_components/your-submissions";

import { type PastRoundData } from "@/lib/types";

export default function PastRoundPage({ data }: { data: PastRoundData }) {
  return (
    <>
      <PastRoundDetails data={data} />
      <WinnersTable data={data} />
      <YourSubmissions round={data.id} />
    </>
  );
}
