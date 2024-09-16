"use client";

import Details from "./_components/details";
import Pagination from "./_components/pagination";
import Submit from "./_components/submit";
import LeaderboardTable from "./_components/leaderboard-table";

export default function Home({ params }: { params: { num: string } }) {
  const currentPage = Number(params.num);

  return (
    <>
      <section className="w-1/2 p-2 bg-green-50">picture</section>
      <section className="w-1/2 p-2 space-y-8">
        <Pagination currentPage={currentPage} />
        <Details />
        <Submit />
        <LeaderboardTable />
      </section>
    </>
  );
}
