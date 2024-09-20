"use client";

import ActiveRoundDetails from "../_components/active-round-details";
import Pagination from "../_components/pagination";
import Submit from "../_components/submit";
import YourSubmissions from "../_components/your-submissions";

import { type ActiveRoundData } from "@/lib/types";

export default function ActiveRoundPage({ data }: { data: ActiveRoundData }) {
  return (
    <>
      <div className="mb-9 space-y-4">
        <Pagination currentPage={data.id} />
        <ActiveRoundDetails data={data} />
      </div>
      <Submit
        round={data.id}
        feeAmount={data.feeAmount}
        submissionDeadline={data.submissionDeadline}
      />
      <YourSubmissions round={data.id} />
    </>
  );
}
