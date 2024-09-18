"use client";

import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Pagination({ currentPage }: { currentPage: number }) {
  const {
    data: latestRound,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["latest-round"],
    queryFn: () => apiClient.getLatestRoundNumber(),
  });

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = isLoading || !isSuccess || currentPage >= latestRound.id;

  return (
    <div className="flex items-center gap-x-2 text-sm">
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7 rounded-full"
        disabled={isPrevDisabled}
      >
        <Link href={`/round/${currentPage - 1}`}>
          <ArrowLeftIcon className="h-4 w-4" />
        </Link>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7 rounded-full"
        disabled={isNextDisabled}
      >
        <Link href={`/round/${currentPage + 1}`}>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </Button>
      <span className="text-muted-foreground">Round {currentPage}</span>
    </div>
  );
}
