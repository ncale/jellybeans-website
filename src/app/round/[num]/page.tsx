"use client";

import { useReadContract } from "wagmi";
import { JellybeansABI } from "@/constants/JellybeansABI";
import { jellybeansAddress } from "@/constants/contracts";
import { numSchema, type RawRoundData } from "@/lib/types";

import NotFound from "@/app/not-found";
import LoadingPage from "./_pages/loading";
import FetchFailedPage from "./_pages/fetch-failed";
import FutureRoundPage from "./_pages/future-round";
import PreviousRoundPage from "./_pages/previous-round";
import CurrentRoundPage from "./_pages/current-round";

export default function Page({ params }: { params: { num: string } }) {
  const { success, data: currentPage } = numSchema.safeParse(params.num);

  if (success) {
    return <ValidPage currentPage={currentPage} />;
  } else {
    return <NotFound />;
  }
}

function ValidPage({ currentPage }: { currentPage: number }) {
  const { data, isLoading, isSuccess } = useReadContract({
    abi: JellybeansABI,
    address: jellybeansAddress,
    functionName: "rounds",
    args: [BigInt(currentPage)],
  });

  if (isLoading) return <LoadingPage />;
  if (!isSuccess) return <FetchFailedPage />;

  const roundType = determineRoundType(data);
  const [question, submissionDeadline, potAmount, feeAmount, correctAnswer] = data;

  switch (roundType) {
    case "future":
      return (
        <FutureRoundPage
          data={{
            round: currentPage,
            question: "",
            submissionDeadline: 0n,
            potAmount: 0n,
            feeAmount: 0n,
            correctAnswer: 0n,
            isFinalized: false,
          }}
        />
      );
    case "current":
      return (
        <CurrentRoundPage
          data={{
            round: currentPage,
            question,
            submissionDeadline,
            potAmount,
            feeAmount,
            correctAnswer: 0n,
            isFinalized: false,
          }}
        />
      );
    case "previous":
      return (
        <PreviousRoundPage
          data={{
            round: currentPage,
            question,
            submissionDeadline,
            potAmount,
            feeAmount,
            correctAnswer,
            isFinalized: true,
          }}
        />
      );
  }
}

function determineRoundType(data: RawRoundData): "future" | "current" | "previous" {
  const [, submissionDeadline, , , , isFinalized] = data;

  if (submissionDeadline === 0n) {
    return "future";
  } else if (isFinalized) {
    return "previous";
  } else {
    return "current";
  }
}
