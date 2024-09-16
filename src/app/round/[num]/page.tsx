"use client";

import Details from "./_components/details";
import Pagination from "./_components/pagination";
import Submit from "./_components/submit";
import LeaderboardTable from "./_components/leaderboard-table";
import { useReadContract } from "wagmi";
import { JellybeansABI } from "@/constants/JellybeansABI";
import { jellybeansAddress } from "@/constants/contracts";

export default function Home({ params }: { params: { num: string } }) {
  const currentPage = Number(params.num);

  const { data } = useReadContract({
    abi: JellybeansABI,
    address: jellybeansAddress,
    functionName: "rounds",
    args: [BigInt(params.num)],
  });

  if (!data) return <></>;

  const [
    question,
    submissionDeadline,
    potAmount,
    feeAmount,
    correctAnswer,
    isFinalized,
  ] = data;

  if (Number(submissionDeadline) === 0) {
    return <>This round does not exist</>;
  }

  if (isFinalized && Number(correctAnswer) !== 0) {
    return <>This round is completed</>;
  }

  return (
    <>
      <section className="w-1/2 p-2 bg-green-50">picture</section>
      <section className="w-1/2 p-2 space-y-8">
        <Pagination currentPage={currentPage} />
        <Details
          question={question}
          potAmount={potAmount}
          submissionDeadline={submissionDeadline}
        />
        <Submit feeAmount={feeAmount} />
        <LeaderboardTable />
      </section>
    </>
  );
}
