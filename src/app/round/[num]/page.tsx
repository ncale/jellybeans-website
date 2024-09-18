"use client";

import { numSchema, type RawRoundData, type RoundData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api";

import NotFound from "@/app/not-found";
import LoadingPage from "./_pages/loading";
import FetchFailedPage from "./_pages/fetch-failed";
import PastRoundPage from "./_pages/past-round";
import ActiveRoundPage from "./_pages/active-round";

export default function Page({ params }: { params: { num: string } }) {
  const { success, data: round } = numSchema.safeParse(params.num);

  if (success) {
    return <ValidPage round={round} />;
  } else {
    return <NotFound />;
  }
}

function ValidPage({ round }: { round: number }) {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["round", round],
    queryFn: () => apiClient.getRound(round),
  });

  if (isLoading) return <LoadingPage />;
  if (!isSuccess) return <FetchFailedPage />;

  const formattedData = formatData(data);

  switch (formattedData.roundState) {
    case "active":
      return <ActiveRoundPage data={formattedData} />;
    case "past":
      return <PastRoundPage data={formattedData} />;
    default:
      return <>alt</>;
  }
}

function formatData(data: RawRoundData): RoundData {
  const rnd = data.round;
  if (!rnd.isFinalized) {
    return {
      roundState: "active",
      id: Number(rnd.id),
      question: rnd.question,
      submissionDeadline: BigInt(rnd.submissionDeadline),
      potAmount: BigInt(rnd.potAmount),
      feeAmount: BigInt(rnd.feeAmount),
      initRoundTxnHash: rnd.initRoundTxnHash,
      isFinalized: false,
      correctAnswer: null,
      winningAnswer: null,
      winners: null,
      setCorrectAnswerTxnHash: null,
    };
  } else {
    return {
      roundState: "past",
      id: Number(rnd.id),
      question: rnd.question,
      submissionDeadline: BigInt(rnd.submissionDeadline),
      potAmount: BigInt(rnd.potAmount),
      feeAmount: BigInt(rnd.feeAmount),
      initRoundTxnHash: rnd.initRoundTxnHash,
      isFinalized: true,
      correctAnswer: BigInt(rnd.correctAnswer),
      winningAnswer: BigInt(rnd.winningAnswer),
      winners: rnd.winners,
      setCorrectAnswerTxnHash: rnd.setCorrectAnswerTxnHash,
    };
  }
}
