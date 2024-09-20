"use client";

import ActiveRoundDetails from "../_components/active-round-details";
import Submit from "../_components/submit";
import YourSubmissions from "../_components/your-submissions";

import { type ActiveRoundData } from "@/lib/types";

export default function ActiveRoundPage({ data }: { data: ActiveRoundData }) {
  return (
    <>
      <ActiveRoundDetails data={data} />
      <Submit
        round={data.id}
        feeAmount={data.feeAmount}
        submissionDeadline={data.submissionDeadline}
      />
      <YourSubmissions round={data.id} />
    </>
  );
}
